/**
 * @infinityvault/website-middleware
 *
 * Website-specific schemas and middleware
 */

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema.js';

// Export all schemas
export * from './schema.js';

/**
 * Create website database connection with correct ES module + Neon HTTP configuration
 */
export async function createWebsiteDatabase() {
  const connectionString = process.env.DATABASE_URL_WEBSITE;
  if (!connectionString) {
    throw new Error('DATABASE_URL_WEBSITE environment variable is required');
  }

  // Use Neon HTTP client (compatible with ES modules)
  const sql = neon(connectionString);
  const db = drizzle(sql, { schema });

  console.log('✅ Website database connected with Neon HTTP adapter');

  return { db, sql };
}