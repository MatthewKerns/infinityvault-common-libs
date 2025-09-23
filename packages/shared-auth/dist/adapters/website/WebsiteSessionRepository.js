"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteSessionRepository = void 0;
exports.createWebsiteSessionRepository = createWebsiteSessionRepository;
const drizzle_orm_1 = require("drizzle-orm");
const types_1 = require("../../types");
const repositories_1 = require("../../repositories");
const website_middleware_1 = require("@infinityvault/website-middleware");
/**
 * Website-specific session repository implementation
 */
class WebsiteSessionRepository extends repositories_1.AbstractRepository {
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
        console.log('Initializing website database connection for sessions');
    }
    mapWebsiteSessionToAuthSession(websiteSession) {
        return {
            id: websiteSession.id,
            userId: websiteSession.userId,
            sessionToken: websiteSession.sessionToken,
            expiresAt: websiteSession.expiresAt,
            createdAt: websiteSession.createdAt,
            updatedAt: websiteSession.updatedAt || websiteSession.createdAt,
            ipAddress: websiteSession.ipAddress,
            userAgent: websiteSession.userAgent,
            isActive: websiteSession.expiresAt > new Date(),
            rememberMeToken: undefined, // Website sessions don't have remember me in current schema
            rememberMeExpiresAt: undefined
        };
    }
    mapAuthSessionToWebsiteSession(authSession) {
        return {
            id: authSession.id,
            userId: authSession.userId,
            sessionToken: authSession.sessionToken,
            expiresAt: authSession.expiresAt,
            ipAddress: authSession.ipAddress,
            userAgent: authSession.userAgent,
            createdAt: authSession.createdAt || new Date(),
            updatedAt: authSession.updatedAt || new Date()
        };
    }
    // Session CRUD operations
    async create(sessionData) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            // Validate required fields
            this.validateRequiredFields(sessionData, ['userId', 'sessionToken', 'expiresAt']);
            // Prepare session data for insertion
            const websiteSessionData = this.mapAuthSessionToWebsiteSession({
                ...sessionData,
                id: sessionData.id || this.generateId(),
                createdAt: new Date(),
                updatedAt: new Date()
            });
            const result = await this.db
                .insert(website_middleware_1.authSessions)
                .values(websiteSessionData)
                .returning();
            if (result.length === 0) {
                throw new types_1.AuthError('Failed to create session', 'SESSION_CREATION_FAILED');
            }
            return this.mapWebsiteSessionToAuthSession(result[0]);
        }
        catch (error) {
            console.error('Error creating session:', error);
            throw new types_1.AuthError('Failed to create session', 'SESSION_CREATION_FAILED');
        }
    }
    async findByToken(sessionToken) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const result = await this.db
                .select()
                .from(website_middleware_1.authSessions)
                .where((0, drizzle_orm_1.eq)(website_middleware_1.authSessions.sessionToken, sessionToken))
                .limit(1);
            if (result.length === 0) {
                return null;
            }
            return this.mapWebsiteSessionToAuthSession(result[0]);
        }
        catch (error) {
            console.error('Error finding session by token:', error);
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
                .from(website_middleware_1.authSessions)
                .where((0, drizzle_orm_1.eq)(website_middleware_1.authSessions.userId, userId))
                .orderBy((0, drizzle_orm_1.desc)(website_middleware_1.authSessions.createdAt));
            return result.map(session => this.mapWebsiteSessionToAuthSession(session));
        }
        catch (error) {
            console.error('Error finding sessions by user ID:', error);
            return [];
        }
    }
    async update(sessionToken, sessionData) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            // Check if session exists
            const existingSession = await this.findByToken(sessionToken);
            if (!existingSession) {
                throw new types_1.NotFoundError('Session', sessionToken);
            }
            // Prepare update data
            const updateData = this.mapAuthSessionToWebsiteSession({
                ...sessionData,
                updatedAt: new Date()
            });
            // Remove undefined values
            const sanitizedData = this.sanitizeData(updateData);
            const result = await this.db
                .update(website_middleware_1.authSessions)
                .set(sanitizedData)
                .where((0, drizzle_orm_1.eq)(website_middleware_1.authSessions.sessionToken, sessionToken))
                .returning();
            if (result.length === 0) {
                throw new types_1.AuthError('Failed to update session', 'SESSION_UPDATE_FAILED');
            }
            return this.mapWebsiteSessionToAuthSession(result[0]);
        }
        catch (error) {
            if (error instanceof types_1.NotFoundError || error instanceof types_1.AuthError) {
                throw error;
            }
            console.error('Error updating session:', error);
            throw new types_1.AuthError('Failed to update session', 'SESSION_UPDATE_FAILED');
        }
    }
    async delete(sessionToken) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const result = await this.db
                .delete(website_middleware_1.authSessions)
                .where((0, drizzle_orm_1.eq)(website_middleware_1.authSessions.sessionToken, sessionToken))
                .returning();
            return result.length > 0;
        }
        catch (error) {
            console.error('Error deleting session:', error);
            return false;
        }
    }
    // Session management operations
    async invalidateSession(sessionToken) {
        try {
            await this.delete(sessionToken);
        }
        catch (error) {
            console.error('Error invalidating session:', error);
            // Don't throw - invalidation should be idempotent
        }
    }
    async invalidateAllUserSessions(userId) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            await this.db
                .delete(website_middleware_1.authSessions)
                .where((0, drizzle_orm_1.eq)(website_middleware_1.authSessions.userId, userId));
        }
        catch (error) {
            console.error('Error invalidating all user sessions:', error);
            // Don't throw - this is a cleanup operation
        }
    }
    async cleanupExpiredSessions() {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const now = new Date();
            const result = await this.db
                .delete(website_middleware_1.authSessions)
                .where((0, drizzle_orm_1.lt)(website_middleware_1.authSessions.expiresAt, now))
                .returning();
            return result.length;
        }
        catch (error) {
            console.error('Error cleaning up expired sessions:', error);
            return 0;
        }
    }
    async extendSession(sessionToken, expiresAt) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            await this.db
                .update(website_middleware_1.authSessions)
                .set({
                expiresAt,
                updatedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(website_middleware_1.authSessions.sessionToken, sessionToken));
        }
        catch (error) {
            console.error('Error extending session:', error);
            throw new types_1.AuthError('Failed to extend session', 'SESSION_EXTENSION_FAILED');
        }
    }
    // Session analytics
    async getActiveSessions() {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const now = new Date();
            const result = await this.db
                .select()
                .from(website_middleware_1.authSessions)
                .where((0, drizzle_orm_1.gt)(website_middleware_1.authSessions.expiresAt, now))
                .orderBy((0, drizzle_orm_1.desc)(website_middleware_1.authSessions.createdAt));
            return result.map(session => this.mapWebsiteSessionToAuthSession(session));
        }
        catch (error) {
            console.error('Error getting active sessions:', error);
            return [];
        }
    }
    async getUserSessionCount(userId) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const now = new Date();
            const result = await this.db
                .select({ count: (0, drizzle_orm_1.count)() })
                .from(website_middleware_1.authSessions)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(website_middleware_1.authSessions.userId, userId), (0, drizzle_orm_1.gt)(website_middleware_1.authSessions.expiresAt, now)));
            return result[0]?.count || 0;
        }
        catch (error) {
            console.error('Error getting user session count:', error);
            return 0;
        }
    }
    async getSessionStats() {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const now = new Date();
            // Get total sessions
            const totalResult = await this.db
                .select({ count: (0, drizzle_orm_1.count)() })
                .from(website_middleware_1.authSessions);
            const total = totalResult[0]?.count || 0;
            // Get active sessions
            const activeResult = await this.db
                .select({ count: (0, drizzle_orm_1.count)() })
                .from(website_middleware_1.authSessions)
                .where((0, drizzle_orm_1.gt)(website_middleware_1.authSessions.expiresAt, now));
            const active = activeResult[0]?.count || 0;
            const expired = total - active;
            return { total, active, expired };
        }
        catch (error) {
            console.error('Error getting session stats:', error);
            return { total: 0, active: 0, expired: 0 };
        }
    }
    // User lookup through session
    async findUserBySessionToken(sessionToken) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const now = new Date();
            const result = await this.db
                .select({
                user: website_middleware_1.users,
                session: website_middleware_1.authSessions
            })
                .from(website_middleware_1.authSessions)
                .innerJoin(website_middleware_1.users, (0, drizzle_orm_1.eq)(website_middleware_1.authSessions.userId, website_middleware_1.users.id))
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(website_middleware_1.authSessions.sessionToken, sessionToken), (0, drizzle_orm_1.gt)(website_middleware_1.authSessions.expiresAt, now)))
                .limit(1);
            if (result.length === 0) {
                return null;
            }
            const websiteUser = result[0].user;
            return {
                id: websiteUser.id,
                email: websiteUser.email,
                firstName: websiteUser.firstName,
                lastName: websiteUser.lastName,
                isVerified: websiteUser.isVerified || false,
                createdAt: websiteUser.createdAt || new Date(),
                updatedAt: websiteUser.updatedAt || new Date(),
                lastLoginAt: websiteUser.lastLoginAt,
                role: websiteUser.role || 'customer',
                authProvider: websiteUser.authProvider || 'manual',
                passwordHash: websiteUser.passwordHash,
                birthday: websiteUser.birthday ? new Date(websiteUser.birthday) : undefined,
                marketingConsent: websiteUser.marketingConsent
            };
        }
        catch (error) {
            console.error('Error finding user by session token:', error);
            return null;
        }
    }
    // Additional website-specific methods
    async findSessionsByIPAddress(ipAddress, timeframe = 24) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const timeframeStart = new Date();
            timeframeStart.setHours(timeframeStart.getHours() - timeframe);
            const result = await this.db
                .select()
                .from(website_middleware_1.authSessions)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(website_middleware_1.authSessions.ipAddress, ipAddress), (0, drizzle_orm_1.gt)(website_middleware_1.authSessions.createdAt, timeframeStart)))
                .orderBy((0, drizzle_orm_1.desc)(website_middleware_1.authSessions.createdAt));
            return result.map(session => this.mapWebsiteSessionToAuthSession(session));
        }
        catch (error) {
            console.error('Error finding sessions by IP address:', error);
            return [];
        }
    }
    async updateSessionActivity(sessionToken) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            await this.db
                .update(website_middleware_1.authSessions)
                .set({
                updatedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(website_middleware_1.authSessions.sessionToken, sessionToken));
        }
        catch (error) {
            console.error('Error updating session activity:', error);
            // Don't throw - this is for tracking purposes
        }
    }
    // Set database instance (for dependency injection)
    setDatabase(db) {
        this.db = db;
    }
}
exports.WebsiteSessionRepository = WebsiteSessionRepository;
// Factory function for creating WebsiteSessionRepository
function createWebsiteSessionRepository(config, db) {
    return new WebsiteSessionRepository(config, db);
}
//# sourceMappingURL=WebsiteSessionRepository.js.map