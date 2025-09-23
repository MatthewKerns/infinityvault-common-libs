/**
 * @infinityvault/website-middleware
 *
 * Website-specific schemas and middleware
 */
import * as schema from './schema.js';
export * from './schema.js';
/**
 * Create website database connection with correct ES module + Neon HTTP configuration
 */
export declare function createWebsiteDatabase(): Promise<{
    db: import("drizzle-orm/neon-http").NeonHttpDatabase<typeof schema> & {
        $client: import("@neondatabase/serverless").NeonQueryFunction<false, false>;
    };
    sql: import("@neondatabase/serverless").NeonQueryFunction<false, false>;
}>;
//# sourceMappingURL=index.d.ts.map