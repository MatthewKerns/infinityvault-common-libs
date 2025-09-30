/**
 * EOS Agent Secrets Manager - Application-specific secrets for EOS Agent
 */

import { z } from 'zod';
import { AWSSecretsManager, AWSSecretsConfig, SecretsLoadResult } from './AWSSecretsManager.js';
import {
  DatabaseSecrets,
  AuthSecrets,
  ExternalAPISecrets,
  DatabaseSecretsSchema,
  AuthSecretsSchema,
  ExternalAPISecretsSchema
} from './types.js';

export interface EOSDatabaseSecrets extends DatabaseSecrets {
  schema: 'eos';
}

export interface EOSAuthSecrets {
  jwtSecret: string;
  sessionSecret: string;
}

export interface EOSExternalAPISecrets {
  openaiApiKey: string;
  googleClientId: string;
  googleClientSecret: string;
}

export class EOSSecretsManager extends AWSSecretsManager {
  constructor(config?: Partial<AWSSecretsConfig>) {
    const eosConfig: AWSSecretsConfig = {
      region: config?.region || process.env.AWS_REGION || 'us-east-1',
      secretPrefix: 'infinityvault',
      environment: config?.environment || (process.env.NODE_ENV as any) || 'development',
      cacheConfig: {
        ttlMs: config?.cacheConfig?.ttlMs || 3600000, // 1 hour
        maxEntries: config?.cacheConfig?.maxEntries || 100
      },
      circuitBreakerConfig: {
        failureThreshold: config?.circuitBreakerConfig?.failureThreshold || 3,
        resetTimeoutMs: config?.circuitBreakerConfig?.resetTimeoutMs || 60000,
        monitoringWindowMs: config?.circuitBreakerConfig?.monitoringWindowMs || 300000
      },
      fallbackToEnv: config?.fallbackToEnv ?? true
    };

    super(eosConfig);
  }

  /**
   * Get EOS-specific database secrets
   */
  async getEOSDatabaseSecrets(): Promise<SecretsLoadResult<EOSDatabaseSecrets>> {
    return this.getSecrets(
      'eos-agent/database',
      DatabaseSecretsSchema.extend({ schema: z.literal('eos') }),
      this.buildEnvFallback({
        url: process.env.EOS_DATABASE_URL || process.env.DATABASE_URL_EOS,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : undefined,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        schema: 'eos'
      })
    );
  }

  /**
   * Get EOS-specific auth secrets
   */
  async getEOSAuthSecrets(): Promise<SecretsLoadResult<EOSAuthSecrets>> {
    return this.getSecrets(
      'eos-agent/auth',
      AuthSecretsSchema.pick({ jwtSecret: true, sessionSecret: true }),
      this.buildEnvFallback({
        jwtSecret: process.env.JWT_SECRET,
        sessionSecret: process.env.SESSION_SECRET
      })
    );
  }

  /**
   * Get EOS-specific external API secrets
   */
  async getEOSExternalAPISecrets(): Promise<SecretsLoadResult<EOSExternalAPISecrets>> {
    return this.getSecrets(
      'eos-agent/external-api',
      ExternalAPISecretsSchema.pick({
        openaiApiKey: true,
        googleClientId: true,
        googleClientSecret: true
      }),
      this.buildEnvFallback({
        openaiApiKey: process.env.OPENAI_API_KEY,
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    );
  }

  /**
   * Convenience method to load all EOS secrets
   */
  async loadAllEOSSecrets() {
    const [database, auth, externalApi] = await Promise.all([
      this.getEOSDatabaseSecrets(),
      this.getEOSAuthSecrets(),
      this.getEOSExternalAPISecrets()
    ]);

    return {
      database: database.secrets,
      auth: auth.secrets,
      externalApi: externalApi.secrets
    };
  }
}