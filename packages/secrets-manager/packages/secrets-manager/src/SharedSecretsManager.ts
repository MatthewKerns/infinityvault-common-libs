/**
 * Shared Secrets Manager - Cross-application identity and shared services
 */

import { z } from 'zod';
import { AWSSecretsManager, AWSSecretsConfig, SecretsLoadResult } from './AWSSecretsManager.js';
import {
  AuthSecrets,
  AuthSecretsSchema
} from './types.js';

export interface SharedIdentitySecrets extends AuthSecrets {
  googleRedirectUri: string;
}

export class SharedSecretsManager extends AWSSecretsManager {
  constructor(config?: Partial<AWSSecretsConfig>) {
    const sharedConfig: AWSSecretsConfig = {
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

    super(sharedConfig);
  }

  /**
   * Get shared identity secrets used across applications
   */
  async getSharedIdentitySecrets(): Promise<SecretsLoadResult<SharedIdentitySecrets>> {
    return this.getSecrets(
      'shared/identity',
      AuthSecretsSchema.extend({ googleRedirectUri: z.string().url() }),
      this.buildEnvFallback({
        jwtSecret: process.env.JWT_SECRET,
        sessionSecret: process.env.SESSION_SECRET,
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/callback'
      })
    );
  }

  /**
   * Convenience method for auth services that need shared identity
   */
  async getAuthConfig() {
    const identitySecrets = await this.getSharedIdentitySecrets();

    return {
      jwtSecret: identitySecrets.secrets.jwtSecret,
      sessionSecret: identitySecrets.secrets.sessionSecret,
      googleClientId: identitySecrets.secrets.googleClientId,
      googleClientSecret: identitySecrets.secrets.googleClientSecret,
      googleRedirectUri: identitySecrets.secrets.googleRedirectUri
    };
  }
}