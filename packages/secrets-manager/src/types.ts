/**
 * Type definitions for AWS Secrets Manager integration
 * Production-ready secrets management with comprehensive type safety
 */

import { z } from 'zod';

/**
 * Environment types for secret organization
 */
export type Environment = 'development' | 'staging' | 'production' | 'test';

/**
 * Secret categories for type-safe secret management
 */
export const DatabaseSecretsSchema = z.object({
  host: z.string(),
  port: z.number().int().min(1).max(65535),
  username: z.string(),
  password: z.string(),
  database: z.string(),
  ssl: z.boolean().optional(),
  url: z.string().url().optional()
});

export const AuthSecretsSchema = z.object({
  jwtSecret: z.string().min(32),
  sessionSecret: z.string().min(32),
  googleClientId: z.string(),
  googleClientSecret: z.string(),
  googleRedirectUri: z.string().url()
});

export const ExternalAPISecretsSchema = z.object({
  openaiApiKey: z.string().optional(),
  amazonAccessKey: z.string().optional(),
  amazonSecretKey: z.string().optional(),
  slackWebhookUrl: z.string().url().optional(),
  awsAccessKeyId: z.string().optional(),
  awsSecretAccessKey: z.string().optional(),
  spapiClientId: z.string().optional(),
  spapiClientSecret: z.string().optional(),
  spapiRefreshToken: z.string().optional(),
  googleClientId: z.string().optional(),
  googleClientSecret: z.string().optional()
});

export const ApplicationSecretsSchema = z.object({
  encryptionKey: z.string().min(32),
  webhookSecret: z.string().optional(),
  adminApiKey: z.string().optional()
});

/**
 * Complete secrets schema combining all categories
 */
export const SecretsSchema = z.object({
  database: DatabaseSecretsSchema,
  auth: AuthSecretsSchema,
  externalApi: ExternalAPISecretsSchema,
  application: ApplicationSecretsSchema
});

export type DatabaseSecrets = z.infer<typeof DatabaseSecretsSchema>;
export type AuthSecrets = z.infer<typeof AuthSecretsSchema>;
export type ExternalAPISecrets = z.infer<typeof ExternalAPISecretsSchema>;
export type ApplicationSecrets = z.infer<typeof ApplicationSecretsSchema>;
export type Secrets = z.infer<typeof SecretsSchema>;

/**
 * AWS Secrets Manager configuration
 */
export interface AWSSecretsConfig {
  region: string;
  secretPrefix: string;
  environment: Environment;
  cacheConfig: {
    ttlMs: number;
    maxEntries: number;
  };
  circuitBreakerConfig: {
    failureThreshold: number;
    resetTimeoutMs: number;
    monitoringWindowMs: number;
  };
  fallbackToEnv: boolean;
}

/**
 * Cache entry for secrets
 */
export interface CacheEntry<T> {
  value: T;
  timestamp: number;
  ttl: number;
}

/**
 * Circuit breaker states
 */
export type CircuitBreakerState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

/**
 * Circuit breaker status
 */
export interface CircuitBreakerStatus {
  state: CircuitBreakerState;
  failureCount: number;
  lastFailureTime: number | null;
  nextAttemptTime: number | null;
}

/**
 * Secrets loading result
 */
export interface SecretsLoadResult<T> {
  secrets: T;
  source: 'aws' | 'env' | 'cache';
  loadedAt: number;
  cacheHit: boolean;
}

/**
 * Error types for secrets management
 */
export class SecretsError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = 'SecretsError';
  }
}

export class SecretsValidationError extends SecretsError {
  constructor(message: string, public readonly validationErrors: z.ZodError) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'SecretsValidationError';
  }
}

export class CircuitBreakerOpenError extends SecretsError {
  constructor(nextAttemptTime: number) {
    super(
      `Circuit breaker is open. Next attempt allowed at: ${new Date(nextAttemptTime).toISOString()}`,
      'CIRCUIT_BREAKER_OPEN'
    );
    this.name = 'CircuitBreakerOpenError';
  }
}