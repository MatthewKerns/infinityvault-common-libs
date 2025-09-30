/**
 * @infinityvault/secrets-manager - Unified AWS Secrets Manager for InfinityVault applications
 *
 * This package provides AWS Secrets Manager integration with caching, circuit breaker patterns,
 * and application-specific secret management for the separated repository architecture.
 */

// Core exports
export { AWSSecretsManager } from './AWSSecretsManager.js';
export { SecretsCache } from './SecretsCache.js';

// Application-specific secrets managers
export { EOSSecretsManager } from './EOSSecretsManager.js';
export { BrandWebsiteSecretsManager } from './BrandWebsiteSecretsManager.js';
export { SharedSecretsManager } from './SharedSecretsManager.js';

// Types and interfaces
export type {
  DatabaseSecrets,
  AuthSecrets,
  ExternalAPISecrets,
  ApplicationSecrets,
  AWSSecretsConfig,
  SecretsLoadResult,
  CircuitBreakerStatus,
  Environment
} from './types.js';

// Error classes
export {
  SecretsError,
  CircuitBreakerOpenError,
  SecretsValidationError
} from './types.js';

// Factory function for creating app-specific managers
export { createSecretsManager } from './factory.js';