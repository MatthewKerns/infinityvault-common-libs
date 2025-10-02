import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@infinityvault/website-middleware/dist/schema';

/**
 * Database connection singleton for identity bridge service
 */

let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDbConnection(databaseUrl?: string) {
  if (!dbInstance) {
    const url = databaseUrl || process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL environment variable is required');
    }
    const sql = neon(url);
    dbInstance = drizzle(sql, { schema });
  }
  return dbInstance;
}

export const db = getDbConnection();

/**
 * Transaction helper
 */
export const withTransaction = async <T>(
  callback: (tx: any) => Promise<T>
): Promise<T> => {
  const connection = getDbConnection();
  return connection.transaction(callback);
};

// Export schema tables for direct access
export { schema };
export const { users, authSessions, federatedIdentities } = schema;

export default db;
