/**
 * @infinityvault/eos-middleware
 *
 * EOS-specific schemas and middleware
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Export all schemas
export * from './schema';

/**
 * Create EOS database connection
 */
export async function createEOSDatabase() {
  const connectionString = process.env.DATABASE_URL_EOS;
  if (!connectionString) {
    throw new Error('DATABASE_URL_EOS environment variable is required');
  }

  // Create postgres connection
  const sql = postgres(connectionString);
  const db = drizzle(sql, { schema });

  console.log('✅ EOS database connected with postgres adapter');

  return { db, sql };
}