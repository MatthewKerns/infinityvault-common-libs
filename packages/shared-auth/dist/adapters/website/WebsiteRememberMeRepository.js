"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteRememberMeRepository = void 0;
exports.createWebsiteRememberMeRepository = createWebsiteRememberMeRepository;
const drizzle_orm_1 = require("drizzle-orm");
const types_1 = require("../../types");
const repositories_1 = require("../../repositories");
const website_middleware_1 = require("@infinityvault/website-middleware");
/**
 * Website-specific remember me token repository implementation
 */
class WebsiteRememberMeRepository extends repositories_1.AbstractRepository {
    constructor(config, db) {
        super(config);
        if (db) {
            this.db = db;
        }
        else {
            this.initializeDatabase();
        }
    }
    getContext() {
        return {
            type: 'website',
            connectionString: process.env.WEBSITE_DATABASE_URL
        };
    }
    async close() {
        // Database connection managed by website middleware
    }
    async beginTransaction() {
        return { id: 'tx_' + Date.now() };
    }
    async commitTransaction(transaction) {
        console.log('Committing transaction:', transaction.id);
    }
    async rollbackTransaction(transaction) {
        console.log('Rolling back transaction:', transaction.id);
    }
    initializeDatabase() {
        console.log('Initializing website database connection for remember me tokens');
    }
    mapWebsiteTokenToRememberMeToken(websiteToken) {
        return {
            id: websiteToken.id,
            userId: websiteToken.userId,
            tokenHash: websiteToken.tokenHash,
            series: websiteToken.series,
            expiresAt: websiteToken.expiresAt,
            createdAt: websiteToken.createdAt,
            lastUsedAt: websiteToken.lastUsedAt,
            ipAddress: websiteToken.ipAddress,
            userAgent: websiteToken.userAgent,
            isActive: websiteToken.isActive
        };
    }
    mapRememberMeTokenToWebsiteToken(token) {
        return {
            id: token.id,
            userId: token.userId,
            tokenHash: token.tokenHash,
            series: token.series,
            expiresAt: token.expiresAt,
            createdAt: token.createdAt || new Date(),
            lastUsedAt: token.lastUsedAt || new Date(),
            ipAddress: token.ipAddress,
            userAgent: token.userAgent,
            isActive: token.isActive !== undefined ? token.isActive : true
        };
    }
    // Remember me token CRUD operations
    async create(tokenData) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            // Validate required fields
            this.validateRequiredFields(tokenData, ['userId', 'tokenHash', 'series', 'expiresAt']);
            // Prepare token data for insertion
            const websiteTokenData = this.mapRememberMeTokenToWebsiteToken({
                ...tokenData,
                id: tokenData.id || this.generateId(),
                createdAt: new Date(),
                lastUsedAt: new Date()
            });
            const result = await this.db
                .insert(website_middleware_1.rememberMeTokens)
                .values(websiteTokenData)
                .returning();
            if (result.length === 0) {
                throw new types_1.AuthError('Failed to create remember me token', 'TOKEN_CREATION_FAILED');
            }
            return this.mapWebsiteTokenToRememberMeToken(result[0]);
        }
        catch (error) {
            console.error('Error creating remember me token:', error);
            throw new types_1.AuthError('Failed to create remember me token', 'TOKEN_CREATION_FAILED');
        }
    }
    async findByTokenHash(tokenHash) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const result = await this.db
                .select()
                .from(website_middleware_1.rememberMeTokens)
                .where((0, drizzle_orm_1.eq)(website_middleware_1.rememberMeTokens.tokenHash, tokenHash))
                .limit(1);
            if (result.length === 0) {
                return null;
            }
            return this.mapWebsiteTokenToRememberMeToken(result[0]);
        }
        catch (error) {
            console.error('Error finding remember me token by hash:', error);
            return null;
        }
    }
    async findBySeries(series) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const result = await this.db
                .select()
                .from(website_middleware_1.rememberMeTokens)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(website_middleware_1.rememberMeTokens.series, series), (0, drizzle_orm_1.eq)(website_middleware_1.rememberMeTokens.isActive, true), (0, drizzle_orm_1.gt)(website_middleware_1.rememberMeTokens.expiresAt, new Date())))
                .orderBy((0, drizzle_orm_1.desc)(website_middleware_1.rememberMeTokens.createdAt))
                .limit(1);
            if (result.length === 0) {
                return null;
            }
            return this.mapWebsiteTokenToRememberMeToken(result[0]);
        }
        catch (error) {
            console.error('Error finding remember me token by series:', error);
            return null;
        }
    }
    async findByUserId(userId) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const result = await this.db
                .select()
                .from(website_middleware_1.rememberMeTokens)
                .where((0, drizzle_orm_1.eq)(website_middleware_1.rememberMeTokens.userId, userId))
                .orderBy((0, drizzle_orm_1.desc)(website_middleware_1.rememberMeTokens.createdAt));
            return result.map(token => this.mapWebsiteTokenToRememberMeToken(token));
        }
        catch (error) {
            console.error('Error finding remember me tokens by user ID:', error);
            return [];
        }
    }
    async update(tokenHash, tokenData) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            // Check if token exists
            const existingToken = await this.findByTokenHash(tokenHash);
            if (!existingToken) {
                throw new types_1.NotFoundError('Remember me token', tokenHash);
            }
            // Prepare update data
            const updateData = this.mapRememberMeTokenToWebsiteToken(tokenData);
            // Remove undefined values
            const sanitizedData = this.sanitizeData(updateData);
            const result = await this.db
                .update(website_middleware_1.rememberMeTokens)
                .set(sanitizedData)
                .where((0, drizzle_orm_1.eq)(website_middleware_1.rememberMeTokens.tokenHash, tokenHash))
                .returning();
            if (result.length === 0) {
                throw new types_1.AuthError('Failed to update remember me token', 'TOKEN_UPDATE_FAILED');
            }
            return this.mapWebsiteTokenToRememberMeToken(result[0]);
        }
        catch (error) {
            if (error instanceof types_1.NotFoundError || error instanceof types_1.AuthError) {
                throw error;
            }
            console.error('Error updating remember me token:', error);
            throw new types_1.AuthError('Failed to update remember me token', 'TOKEN_UPDATE_FAILED');
        }
    }
    async delete(tokenHash) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const result = await this.db
                .delete(website_middleware_1.rememberMeTokens)
                .where((0, drizzle_orm_1.eq)(website_middleware_1.rememberMeTokens.tokenHash, tokenHash))
                .returning();
            return result.length > 0;
        }
        catch (error) {
            console.error('Error deleting remember me token:', error);
            return false;
        }
    }
    // Remember me token management
    async invalidateToken(tokenHash) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            await this.db
                .update(website_middleware_1.rememberMeTokens)
                .set({
                isActive: false,
                lastUsedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(website_middleware_1.rememberMeTokens.tokenHash, tokenHash));
        }
        catch (error) {
            console.error('Error invalidating remember me token:', error);
            // Don't throw - invalidation should be idempotent
        }
    }
    async invalidateAllUserTokens(userId) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            await this.db
                .update(website_middleware_1.rememberMeTokens)
                .set({
                isActive: false,
                lastUsedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(website_middleware_1.rememberMeTokens.userId, userId));
        }
        catch (error) {
            console.error('Error invalidating all user tokens:', error);
            // Don't throw - this is a cleanup operation
        }
    }
    async cleanupExpiredTokens() {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const now = new Date();
            const result = await this.db
                .delete(website_middleware_1.rememberMeTokens)
                .where((0, drizzle_orm_1.or)((0, drizzle_orm_1.lt)(website_middleware_1.rememberMeTokens.expiresAt, now), (0, drizzle_orm_1.eq)(website_middleware_1.rememberMeTokens.isActive, false)))
                .returning();
            return result.length;
        }
        catch (error) {
            console.error('Error cleaning up expired remember me tokens:', error);
            return 0;
        }
    }
    async updateLastUsed(tokenHash) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            await this.db
                .update(website_middleware_1.rememberMeTokens)
                .set({
                lastUsedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(website_middleware_1.rememberMeTokens.tokenHash, tokenHash));
        }
        catch (error) {
            console.error('Error updating token last used:', error);
            // Don't throw - this is for tracking purposes
        }
    }
    // Token rotation support
    async rotateToken(oldTokenHash, newTokenData) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            // Get the old token to preserve series and user ID
            const oldToken = await this.findByTokenHash(oldTokenHash);
            if (!oldToken) {
                throw new types_1.NotFoundError('Remember me token', oldTokenHash);
            }
            // Create new token with same series
            const newToken = await this.create({
                ...newTokenData,
                userId: oldToken.userId,
                series: oldToken.series // Keep same series for token rotation
            });
            // Invalidate old token
            await this.invalidateToken(oldTokenHash);
            return newToken;
        }
        catch (error) {
            if (error instanceof types_1.NotFoundError) {
                throw error;
            }
            console.error('Error rotating remember me token:', error);
            throw new types_1.AuthError('Failed to rotate remember me token', 'TOKEN_ROTATION_FAILED');
        }
    }
    // Analytics and limits
    async getUserTokenCount(userId) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const now = new Date();
            const result = await this.db
                .select({ count: (0, drizzle_orm_1.count)() })
                .from(website_middleware_1.rememberMeTokens)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(website_middleware_1.rememberMeTokens.userId, userId), (0, drizzle_orm_1.eq)(website_middleware_1.rememberMeTokens.isActive, true), (0, drizzle_orm_1.gt)(website_middleware_1.rememberMeTokens.expiresAt, now)));
            return result[0]?.count || 0;
        }
        catch (error) {
            console.error('Error getting user token count:', error);
            return 0;
        }
    }
    async cleanupExcessTokens(userId, maxTokens) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            // Get active tokens for user, oldest first
            const now = new Date();
            const tokens = await this.db
                .select()
                .from(website_middleware_1.rememberMeTokens)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(website_middleware_1.rememberMeTokens.userId, userId), (0, drizzle_orm_1.eq)(website_middleware_1.rememberMeTokens.isActive, true), (0, drizzle_orm_1.gt)(website_middleware_1.rememberMeTokens.expiresAt, now)))
                .orderBy(website_middleware_1.rememberMeTokens.createdAt); // Oldest first
            if (tokens.length <= maxTokens) {
                return 0; // No cleanup needed
            }
            // Invalidate excess tokens (oldest ones)
            const tokensToRemove = tokens.slice(0, tokens.length - maxTokens);
            const tokenHashesToRemove = tokensToRemove.map(token => token.tokenHash);
            if (tokenHashesToRemove.length > 0) {
                await this.db
                    .update(website_middleware_1.rememberMeTokens)
                    .set({
                    isActive: false,
                    lastUsedAt: new Date()
                })
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(website_middleware_1.rememberMeTokens.userId, userId), (0, drizzle_orm_1.or)(...tokenHashesToRemove.map(hash => (0, drizzle_orm_1.eq)(website_middleware_1.rememberMeTokens.tokenHash, hash)))));
            }
            return tokenHashesToRemove.length;
        }
        catch (error) {
            console.error('Error cleaning up excess tokens:', error);
            return 0;
        }
    }
    // Set database instance (for dependency injection)
    setDatabase(db) {
        this.db = db;
    }
}
exports.WebsiteRememberMeRepository = WebsiteRememberMeRepository;
// Factory function for creating WebsiteRememberMeRepository
function createWebsiteRememberMeRepository(config, db) {
    return new WebsiteRememberMeRepository(config, db);
}
//# sourceMappingURL=WebsiteRememberMeRepository.js.map