/**
 * AWSSecretsManager - Green Phase Implementation
 * Production-ready AWS Secrets Manager client with circuit breaker and caching
 */

import {
  SecretsManagerClient,
  GetSecretValueCommand,
  GetSecretValueCommandOutput
} from '@aws-sdk/client-secrets-manager';
import {
  DatabaseSecrets,
  AuthSecrets,
  ExternalAPISecrets,
  ApplicationSecrets,
  AWSSecretsConfig,
  SecretsLoadResult,
  CircuitBreakerState,
  CircuitBreakerStatus,
  SecretsError,
  CircuitBreakerOpenError,
  SecretsValidationError,
  DatabaseSecretsSchema,
  AuthSecretsSchema,
  ExternalAPISecretsSchema,
  ApplicationSecretsSchema
} from '../types/secrets';

// Re-export types for convenience
export type {
  DatabaseSecrets,
  AuthSecrets,
  ExternalAPISecrets,
  ApplicationSecrets,
  AWSSecretsConfig,
  SecretsLoadResult,
  CircuitBreakerStatus
} from '../types/secrets';

export {
  SecretsError,
  CircuitBreakerOpenError,
  SecretsValidationError
} from '../types/secrets';
import { SecretsCache } from './SecretsCache';
import { ZodError } from 'zod';

interface SecretsMetrics {
  totalRequests: number;
  cacheHits: number;
  awsRequests: number;
  fallbackRequests: number;
  errors: number;
  cacheHitRate: number;
  errorRate: number;
}

export class AWSSecretsManager {
  private client: SecretsManagerClient;
  private cache: SecretsCache<any>;
  private circuitBreakerState: CircuitBreakerState = 'CLOSED';
  private failureCount = 0;
  private lastFailureTime: number | null = null;
  private nextAttemptTime: number | null = null;
  private metrics: SecretsMetrics = {
    totalRequests: 0,
    cacheHits: 0,
    awsRequests: 0,
    fallbackRequests: 0,
    errors: 0,
    cacheHitRate: 0,
    errorRate: 0
  };
  private isShutdown = false;

  constructor(private config: AWSSecretsConfig) {
    this.validateConfig(config);
    this.client = new SecretsManagerClient({ region: config.region });
    this.cache = new SecretsCache(config.cacheConfig);
  }

  async getDatabaseSecrets(): Promise<SecretsLoadResult<DatabaseSecrets>> {
    return this.getSecrets('database', DatabaseSecretsSchema, this.buildEnvFallback({
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : undefined,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME || process.env.DATABASE_DATABASE,
      ssl: process.env.DATABASE_SSL === 'true',
      url: process.env.DATABASE_URL
    }));
  }

  async getAuthSecrets(): Promise<SecretsLoadResult<AuthSecrets>> {
    return this.getSecrets('auth', AuthSecretsSchema, this.buildEnvFallback({
      jwtSecret: process.env.JWT_SECRET,
      sessionSecret: process.env.SESSION_SECRET,
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
      googleRedirectUri: process.env.GOOGLE_REDIRECT_URI
    }));
  }

  async getExternalAPISecrets(): Promise<SecretsLoadResult<ExternalAPISecrets>> {
    return this.getSecrets('external-api', ExternalAPISecretsSchema, this.buildEnvFallback({
      openaiApiKey: process.env.OPENAI_API_KEY,
      amazonAccessKey: process.env.AMAZON_ACCESS_KEY,
      amazonSecretKey: process.env.AMAZON_SECRET_KEY,
      slackWebhookUrl: process.env.SLACK_WEBHOOK_URL
    }));
  }

  async getApplicationSecrets(): Promise<SecretsLoadResult<ApplicationSecrets>> {
    return this.getSecrets('application', ApplicationSecretsSchema, this.buildEnvFallback({
      encryptionKey: process.env.ENCRYPTION_KEY,
      webhookSecret: process.env.WEBHOOK_SECRET,
      adminApiKey: process.env.ADMIN_API_KEY
    }));
  }

  private async getSecrets<T>(
    secretType: string,
    schema: any,
    fallbackData: any
  ): Promise<SecretsLoadResult<T>> {
    if (this.isShutdown) {
      throw new SecretsError('SecretsManager has been shutdown', 'SHUTDOWN');
    }

    this.metrics.totalRequests++;

    // Check cache first
    const cached = this.cache.get(secretType);
    if (cached) {
      this.metrics.cacheHits++;
      this.updateMetrics();
      return {
        secrets: cached,
        source: 'cache',
        loadedAt: Date.now(),
        cacheHit: true
      };
    }

    // Check circuit breaker
    if (this.circuitBreakerState === 'OPEN') {
      if (this.nextAttemptTime && Date.now() < this.nextAttemptTime) {
        throw new CircuitBreakerOpenError(this.nextAttemptTime);
      } else {
        this.circuitBreakerState = 'HALF_OPEN';
      }
    }

    try {
      // Try AWS first
      const secrets = await this.fetchFromAWS<T>(secretType, schema);
      this.cache.set(secretType, secrets);
      this.onSuccess();
      this.metrics.awsRequests++;

      return {
        secrets,
        source: 'aws',
        loadedAt: Date.now(),
        cacheHit: false
      };
    } catch (error) {
      this.onFailure(error as Error);
      this.metrics.errors++;

      if (this.config.fallbackToEnv && Object.keys(fallbackData).length > 0) {
        try {
          const validatedSecrets = schema.parse(fallbackData);
          this.metrics.fallbackRequests++;

          return {
            secrets: validatedSecrets,
            source: 'env',
            loadedAt: Date.now(),
            cacheHit: false
          };
        } catch (validationError) {
          throw new SecretsValidationError(
            'Environment fallback validation failed',
            validationError as ZodError
          );
        }
      }

      // Re-throw the original error to preserve error context
      if (error instanceof SecretsError) {
        throw error;
      }

      throw new SecretsError(
        `Failed to load secrets: ${(error as Error).message}`,
        'AWS_SECRETS_ERROR',
        error as Error
      );
    } finally {
      this.updateMetrics();
    }
  }

  private async fetchFromAWS<T>(secretType: string, schema: any): Promise<T> {
    const secretName = `${this.config.secretPrefix}/${this.config.environment}/${secretType}`;
    const command = new GetSecretValueCommand({ SecretId: secretName });

    try {
      const response: GetSecretValueCommandOutput = await this.client.send(command);

      let secretData: any;
      if (response.SecretString) {
        secretData = JSON.parse(response.SecretString);
      } else if (response.SecretBinary) {
        const buffer = Buffer.from(response.SecretBinary);
        secretData = JSON.parse(buffer.toString());
      } else {
        throw new SecretsError('No secret data found in response', 'NO_DATA');
      }

      return schema.parse(secretData);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new SecretsValidationError('AWS secret validation failed', error);
      }

      if (error instanceof SyntaxError) {
        throw new SecretsError('Invalid JSON in secret', 'INVALID_JSON', error);
      }

      throw new SecretsError(
        `Failed to fetch secret from AWS: ${(error as Error).message}`,
        'AWS_SECRETS_ERROR',
        error as Error
      );
    }
  }

  private buildEnvFallback(envData: Record<string, any>): Record<string, any> {
    const filtered: Record<string, any> = {};
    for (const [key, value] of Object.entries(envData)) {
      if (value !== undefined && value !== null && value !== '') {
        filtered[key] = value;
      }
    }
    return filtered;
  }

  private onSuccess(): void {
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.circuitBreakerState = 'CLOSED';
    this.nextAttemptTime = null;
  }

  private onFailure(error: Error): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.config.circuitBreakerConfig.failureThreshold) {
      this.circuitBreakerState = 'OPEN';
      this.nextAttemptTime = Date.now() + this.config.circuitBreakerConfig.resetTimeoutMs;
    }
  }

  private updateMetrics(): void {
    const total = this.metrics.totalRequests;
    this.metrics.cacheHitRate = total > 0 ? this.metrics.cacheHits / total : 0;
    this.metrics.errorRate = total > 0 ? this.metrics.errors / total : 0;
  }

  private validateConfig(config: AWSSecretsConfig): void {
    if (!config.region) {
      throw new SecretsError('AWS region is required', 'INVALID_CONFIG');
    }
    if (!config.secretPrefix) {
      throw new SecretsError('Secret prefix is required', 'INVALID_CONFIG');
    }
    if (!config.environment) {
      throw new SecretsError('Environment is required', 'INVALID_CONFIG');
    }
  }

  invalidateCache(secretType?: string): void {
    if (secretType) {
      this.cache.delete(secretType);
    } else {
      this.cache.clear();
    }
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCircuitBreakerStatus(): CircuitBreakerStatus {
    return {
      state: this.circuitBreakerState,
      failureCount: this.failureCount,
      lastFailureTime: this.lastFailureTime,
      nextAttemptTime: this.nextAttemptTime
    };
  }

  resetCircuitBreaker(): void {
    this.circuitBreakerState = 'CLOSED';
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.nextAttemptTime = null;
  }

  getMetrics(): SecretsMetrics {
    return { ...this.metrics };
  }

  resetMetrics(): void {
    this.metrics = {
      totalRequests: 0,
      cacheHits: 0,
      awsRequests: 0,
      fallbackRequests: 0,
      errors: 0,
      cacheHitRate: 0,
      errorRate: 0
    };
  }

  updateConfig(newConfig: AWSSecretsConfig): void {
    this.validateConfig(newConfig);
    this.config = newConfig;
    this.client = new SecretsManagerClient({ region: newConfig.region });
    this.cache = new SecretsCache(newConfig.cacheConfig);
  }

  async shutdown(): Promise<void> {
    this.isShutdown = true;
    this.cache.clear();
  }
}