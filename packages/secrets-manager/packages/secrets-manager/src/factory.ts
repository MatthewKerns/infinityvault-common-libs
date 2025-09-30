/**
 * Factory function for creating application-specific secrets managers
 */

import { AWSSecretsConfig } from './types.js';
import { EOSSecretsManager } from './EOSSecretsManager.js';
import { BrandWebsiteSecretsManager } from './BrandWebsiteSecretsManager.js';
import { SharedSecretsManager } from './SharedSecretsManager.js';

export type ApplicationType = 'eos-agent' | 'brand-website' | 'shared';

/**
 * Create application-specific secrets manager
 */
export function createSecretsManager(
  applicationType: ApplicationType,
  config?: Partial<AWSSecretsConfig>
) {
  switch (applicationType) {
    case 'eos-agent':
      return new EOSSecretsManager(config);

    case 'brand-website':
      return new BrandWebsiteSecretsManager(config);

    case 'shared':
      return new SharedSecretsManager(config);

    default:
      throw new Error(`Unknown application type: ${applicationType}`);
  }
}

/**
 * Auto-detect application type and create appropriate manager
 */
export function createSecretsManagerAuto(config?: Partial<AWSSecretsConfig>) {
  // Try to auto-detect based on environment variables or package.json
  const packageName = process.env.npm_package_name;

  if (packageName?.includes('eos-agent') || process.env.APP_TYPE === 'eos-agent') {
    return createSecretsManager('eos-agent', config);
  }

  if (packageName?.includes('brand-website') || process.env.APP_TYPE === 'brand-website') {
    return createSecretsManager('brand-website', config);
  }

  // Default to shared for libraries or unknown contexts
  return createSecretsManager('shared', config);
}