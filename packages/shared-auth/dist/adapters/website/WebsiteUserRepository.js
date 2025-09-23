"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteUserRepository = void 0;
exports.createWebsiteUserRepository = createWebsiteUserRepository;
const drizzle_orm_1 = require("drizzle-orm");
const types_1 = require("../../types");
const repositories_1 = require("../../repositories");
const website_middleware_1 = require("@infinityvault/website-middleware");
/**
 * Website-specific user repository implementation
 */
class WebsiteUserRepository extends repositories_1.AbstractRepository {
    constructor(config, db) {
        super(config);
        if (db) {
            this.db = db;
        }
        else {
            // Initialize database connection if not provided
            // This would typically use the existing database connection from website middleware
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
        // No need to close here
    }
    async beginTransaction() {
        // For now, return a mock transaction
        // In a real implementation, this would start a database transaction
        return { id: 'tx_' + Date.now() };
    }
    async commitTransaction(transaction) {
        // Commit transaction in real implementation
        console.log('Committing transaction:', transaction.id);
    }
    async rollbackTransaction(transaction) {
        // Rollback transaction in real implementation
        console.log('Rolling back transaction:', transaction.id);
    }
    initializeDatabase() {
        // Initialize database connection using website middleware
        // This is a placeholder - would use actual database initialization
        console.log('Initializing website database connection');
    }
    mapWebsiteUserToBaseUser(websiteUser) {
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
    mapBaseUserToWebsiteUser(baseUser) {
        return {
            id: baseUser.id,
            email: baseUser.email,
            firstName: baseUser.firstName,
            lastName: baseUser.lastName,
            isVerified: baseUser.isVerified,
            createdAt: baseUser.createdAt,
            updatedAt: baseUser.updatedAt || new Date(),
            lastLoginAt: baseUser.lastLoginAt,
            role: baseUser.role,
            authProvider: baseUser.authProvider,
            passwordHash: baseUser.passwordHash,
            birthday: baseUser.birthday?.toISOString().split('T')[0], // Convert to string format
            marketingConsent: baseUser.marketingConsent
        };
    }
    // User CRUD operations
    async findById(id) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const result = await this.db
                .select()
                .from(website_middleware_1.users)
                .where((0, drizzle_orm_1.eq)(website_middleware_1.users.id, id))
                .limit(1);
            if (result.length === 0) {
                return null;
            }
            return this.mapWebsiteUserToBaseUser(result[0]);
        }
        catch (error) {
            console.error('Error finding user by ID:', error);
            throw new types_1.AuthError('Failed to find user', 'USER_LOOKUP_FAILED');
        }
    }
    async findByEmail(email) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const result = await this.db
                .select()
                .from(website_middleware_1.users)
                .where((0, drizzle_orm_1.eq)(website_middleware_1.users.email, email))
                .limit(1);
            if (result.length === 0) {
                return null;
            }
            return this.mapWebsiteUserToBaseUser(result[0]);
        }
        catch (error) {
            console.error('Error finding user by email:', error);
            throw new types_1.AuthError('Failed to find user', 'USER_LOOKUP_FAILED');
        }
    }
    async create(userData) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            // Validate required fields
            this.validateRequiredFields(userData, ['email']);
            // Check if user already exists
            const existingUser = await this.findByEmail(userData.email);
            if (existingUser) {
                throw new types_1.ConflictError('User', 'email', userData.email);
            }
            // Prepare user data for insertion
            const websiteUserData = this.mapBaseUserToWebsiteUser({
                ...userData,
                id: userData.id || this.generateId(),
                createdAt: new Date(),
                updatedAt: new Date()
            });
            const result = await this.db
                .insert(website_middleware_1.users)
                .values(websiteUserData)
                .returning();
            if (result.length === 0) {
                throw new types_1.AuthError('Failed to create user', 'USER_CREATION_FAILED');
            }
            return this.mapWebsiteUserToBaseUser(result[0]);
        }
        catch (error) {
            if (error instanceof types_1.ConflictError || error instanceof types_1.AuthError) {
                throw error;
            }
            console.error('Error creating user:', error);
            throw new types_1.AuthError('Failed to create user', 'USER_CREATION_FAILED');
        }
    }
    async update(id, userData) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            // Check if user exists
            const existingUser = await this.findById(id);
            if (!existingUser) {
                throw new types_1.NotFoundError('User', id);
            }
            // Prepare update data
            const updateData = this.mapBaseUserToWebsiteUser({
                ...userData,
                updatedAt: new Date()
            });
            // Remove undefined values
            const sanitizedData = this.sanitizeData(updateData);
            const result = await this.db
                .update(website_middleware_1.users)
                .set(sanitizedData)
                .where((0, drizzle_orm_1.eq)(website_middleware_1.users.id, id))
                .returning();
            if (result.length === 0) {
                throw new types_1.AuthError('Failed to update user', 'USER_UPDATE_FAILED');
            }
            return this.mapWebsiteUserToBaseUser(result[0]);
        }
        catch (error) {
            if (error instanceof types_1.NotFoundError || error instanceof types_1.AuthError) {
                throw error;
            }
            console.error('Error updating user:', error);
            throw new types_1.AuthError('Failed to update user', 'USER_UPDATE_FAILED');
        }
    }
    async delete(id) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            // Check if user exists
            const existingUser = await this.findById(id);
            if (!existingUser) {
                return false;
            }
            const result = await this.db
                .delete(website_middleware_1.users)
                .where((0, drizzle_orm_1.eq)(website_middleware_1.users.id, id))
                .returning();
            return result.length > 0;
        }
        catch (error) {
            console.error('Error deleting user:', error);
            throw new types_1.AuthError('Failed to delete user', 'USER_DELETION_FAILED');
        }
    }
    // Authentication-specific user operations
    async updateLastLogin(id) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            await this.db
                .update(website_middleware_1.users)
                .set({
                lastLoginAt: new Date(),
                updatedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(website_middleware_1.users.id, id));
        }
        catch (error) {
            console.error('Error updating last login:', error);
            // Don't throw - this is not critical
        }
    }
    async updatePassword(id, passwordHash) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            // Check if user exists
            const existingUser = await this.findById(id);
            if (!existingUser) {
                throw new types_1.NotFoundError('User', id);
            }
            await this.db
                .update(website_middleware_1.users)
                .set({
                passwordHash,
                updatedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(website_middleware_1.users.id, id));
        }
        catch (error) {
            if (error instanceof types_1.NotFoundError) {
                throw error;
            }
            console.error('Error updating password:', error);
            throw new types_1.AuthError('Failed to update password', 'PASSWORD_UPDATE_FAILED');
        }
    }
    async updateEmailVerification(id, isVerified) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            await this.db
                .update(website_middleware_1.users)
                .set({
                isVerified,
                updatedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(website_middleware_1.users.id, id));
        }
        catch (error) {
            console.error('Error updating email verification:', error);
            throw new types_1.AuthError('Failed to update email verification', 'VERIFICATION_UPDATE_FAILED');
        }
    }
    // Bulk operations
    async findByIds(ids) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            if (ids.length === 0) {
                return [];
            }
            const result = await this.db
                .select()
                .from(website_middleware_1.users)
                .where((0, drizzle_orm_1.or)(...ids.map(id => (0, drizzle_orm_1.eq)(website_middleware_1.users.id, id))));
            return result.map(user => this.mapWebsiteUserToBaseUser(user));
        }
        catch (error) {
            console.error('Error finding users by IDs:', error);
            throw new types_1.AuthError('Failed to find users', 'USER_LOOKUP_FAILED');
        }
    }
    async countUsers() {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const result = await this.db
                .select({ count: (0, drizzle_orm_1.count)() })
                .from(website_middleware_1.users);
            return result[0]?.count || 0;
        }
        catch (error) {
            console.error('Error counting users:', error);
            return 0;
        }
    }
    // Advanced queries
    async findActiveUsers(limit = 100) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            // Define "active" as users who have logged in within the last 30 days
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const result = await this.db
                .select()
                .from(website_middleware_1.users)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(website_middleware_1.users.isVerified, true), (0, drizzle_orm_1.gt)(website_middleware_1.users.lastLoginAt, thirtyDaysAgo)))
                .orderBy((0, drizzle_orm_1.desc)(website_middleware_1.users.lastLoginAt))
                .limit(limit);
            return result.map(user => this.mapWebsiteUserToBaseUser(user));
        }
        catch (error) {
            console.error('Error finding active users:', error);
            return [];
        }
    }
    async findUsersByRole(role) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const result = await this.db
                .select()
                .from(website_middleware_1.users)
                .where((0, drizzle_orm_1.eq)(website_middleware_1.users.role, role))
                .orderBy((0, drizzle_orm_1.asc)(website_middleware_1.users.createdAt));
            return result.map(user => this.mapWebsiteUserToBaseUser(user));
        }
        catch (error) {
            console.error('Error finding users by role:', error);
            return [];
        }
    }
    async searchUsers(query, limit = 50) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            // Search by email, first name, or last name
            const searchPattern = `%${query.toLowerCase()}%`;
            const result = await this.db
                .select()
                .from(website_middleware_1.users)
                .where((0, drizzle_orm_1.or)((0, drizzle_orm_1.eq)(website_middleware_1.users.email, query)))
                .limit(limit);
            return result.map(user => this.mapWebsiteUserToBaseUser(user));
        }
        catch (error) {
            console.error('Error searching users:', error);
            return [];
        }
    }
    // Additional website-specific methods
    async findByPhoneNumber(phoneNumber) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const result = await this.db
                .select()
                .from(website_middleware_1.users)
                .where((0, drizzle_orm_1.eq)(website_middleware_1.users.phoneNumber, phoneNumber))
                .limit(1);
            if (result.length === 0) {
                return null;
            }
            return this.mapWebsiteUserToBaseUser(result[0]);
        }
        catch (error) {
            console.error('Error finding user by phone number:', error);
            return null;
        }
    }
    async updateMarketingConsent(id, consent) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            await this.db
                .update(website_middleware_1.users)
                .set({
                marketingConsent: consent,
                updatedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(website_middleware_1.users.id, id));
        }
        catch (error) {
            console.error('Error updating marketing consent:', error);
            throw new types_1.AuthError('Failed to update marketing consent', 'CONSENT_UPDATE_FAILED');
        }
    }
    async updatePhoneVerification(id, phoneNumber, isVerified) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            await this.db
                .update(website_middleware_1.users)
                .set({
                phoneNumber,
                phoneVerified: isVerified,
                updatedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(website_middleware_1.users.id, id));
        }
        catch (error) {
            console.error('Error updating phone verification:', error);
            throw new types_1.AuthError('Failed to update phone verification', 'PHONE_UPDATE_FAILED');
        }
    }
    // Set database instance (for dependency injection)
    setDatabase(db) {
        this.db = db;
    }
}
exports.WebsiteUserRepository = WebsiteUserRepository;
// Factory function for creating WebsiteUserRepository
function createWebsiteUserRepository(config, db) {
    return new WebsiteUserRepository(config, db);
}
//# sourceMappingURL=WebsiteUserRepository.js.map