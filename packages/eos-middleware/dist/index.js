/**
 * @infinityvault/eos-middleware
 *
 * EOS-specific schemas and middleware
 */
// Export all schemas
export * from './schema';
// Export database connection helper
import { createDatabaseConnection, resolveDatabaseUrl } from '@infinityvault/shared-infrastructure';
import * as schema from './schema';
export function createEOSDatabase() {
    const url = resolveDatabaseUrl('eos');
    return createDatabaseConnection({
        connectionString: url,
        schema,
        logger: process.env.NODE_ENV === 'development'
    });
}
//# sourceMappingURL=index.js.map