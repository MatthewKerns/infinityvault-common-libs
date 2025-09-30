/**
 * Brand Website Secrets Manager - Application-specific secrets for Brand Website
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

export interface BrandWebsiteDatabaseSecrets extends DatabaseSecrets {
  schema: 'brandwebsite';
}

export interface BrandWebsiteAuthSecrets extends AuthSecrets {
  oauthStateSecret: string;
}

export interface BrandWebsiteExternalAPISecrets {
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
  spapiClientId: string;
  spapiClientSecret: string;
  spapiRefreshToken: string;
}

export class BrandWebsiteSecretsManager extends AWSSecretsManager {
  constructor(config?: Partial<AWSSecretsConfig>) {
    const brandWebsiteConfig: AWSSecretsConfig = {
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

    super(brandWebsiteConfig);
  }

  /**
   * Get Brand Website-specific database secrets
   */
  async getBrandWebsiteDatabaseSecrets(): Promise<SecretsLoadResult<BrandWebsiteDatabaseSecrets>> {
    return this.getSecrets(
      'brand-website/database',
      DatabaseSecretsSchema.extend({ schema: z.literal('brandwebsite') }),
      this.buildEnvFallback({
        url: process.env.DATABASE_URL_WEBSITE || process.env.DATABASE_URL,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : undefined,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        schema: 'brandwebsite'
      })
    );
  }

  /**
   * Get Brand Website-specific auth secrets
   */
  async getBrandWebsiteAuthSecrets(): Promise<SecretsLoadResult<BrandWebsiteAuthSecrets>> {
    return this.getSecrets(
      'brand-website/auth',
      AuthSecretsSchema.extend({ oauthStateSecret: z.string() }),
      this.buildEnvFallback({
        jwtSecret: process.env.JWT_SECRET,
        sessionSecret: process.env.SESSION_SECRET,
        oauthStateSecret: process.env.OAUTH_STATE_SECRET,
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        googleRedirectUri: process.env.GOOGLE_REDIRECT_URI
      })
    );
  }

  /**
   * Get Brand Website-specific external API secrets
   */
  async getBrandWebsiteExternalAPISecrets(): Promise<SecretsLoadResult<BrandWebsiteExternalAPISecrets>> {
    return this.getSecrets(
      'brand-website/external-api',
      ExternalAPISecretsSchema.pick({
        awsAccessKeyId: true,
        awsSecretAccessKey: true,
        spapiClientId: true,
        spapiClientSecret: true,
        spapiRefreshToken: true
      }),
      this.buildEnvFallback({
        awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
        awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        spapiClientId: process.env.SPAPI_CLIENT_ID,
        spapiClientSecret: process.env.SPAPI_CLIENT_SECRET,
        spapiRefreshToken: process.env.SPAPI_REFRESH_TOKEN
      })
    );
  }

  /**
   * Convenience method to load all Brand Website secrets
   */
  async loadAllBrandWebsiteSecrets() {
    const [database, auth, externalApi] = await Promise.all([
      this.getBrandWebsiteDatabaseSecrets(),
      this.getBrandWebsiteAuthSecrets(),
      this.getBrandWebsiteExternalAPISecrets()
    ]);

    return {
      database: database.secrets,
      auth: auth.secrets,
      externalApi: externalApi.secrets
    };
  }
}