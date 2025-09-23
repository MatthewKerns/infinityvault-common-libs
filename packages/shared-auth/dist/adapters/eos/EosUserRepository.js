"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EosUserRepository = void 0;
exports.createEosUserRepository = createEosUserRepository;
const drizzle_orm_1 = require("drizzle-orm");
const types_1 = require("../../types");
const repositories_1 = require("../../repositories");
const eos_middleware_1 = require("@infinityvault/eos-middleware");
/**
 * EOS-specific user repository implementation
 */
class EosUserRepository extends repositories_1.AbstractRepository {
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
            type: 'eos',
            connectionString: process.env.EOS_DATABASE_URL
        };
    }
    async close() {
        // Database connection managed by EOS middleware
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
        console.log('Initializing EOS database connection');
    }
    mapEosUserToBaseUser(eosUser) {
        return {
            id: eosUser.id,
            email: eosUser.email,
            firstName: eosUser.firstName,
            lastName: eosUser.lastName,
            isVerified: eosUser.isVerified || false,
            createdAt: eosUser.createdAt || new Date(),
            updatedAt: eosUser.updatedAt || new Date(),
            lastLoginAt: eosUser.lastLoginAt,
            role: this.mapOrganizationRoleToRole(eosUser.organizationRole),
            authProvider: eosUser.authProvider || 'manual',
            passwordHash: eosUser.passwordHash,
            birthday: undefined, // EOS users don't have birthday
            marketingConsent: undefined // EOS users don't have marketing consent
        };
    }
    mapBaseUserToEosUser(baseUser) {
        return {
            id: baseUser.id,
            email: baseUser.email,
            firstName: baseUser.firstName,
            lastName: baseUser.lastName,
            isVerified: baseUser.isVerified,
            createdAt: baseUser.createdAt,
            updatedAt: baseUser.updatedAt || new Date(),
            lastLoginAt: baseUser.lastLoginAt,
            organizationRole: this.mapRoleToOrganizationRole(baseUser.role),
            authProvider: baseUser.authProvider,
            passwordHash: baseUser.passwordHash,
            eosPermissions: this.getDefaultPermissions(baseUser.role)
        };
    }
    mapOrganizationRoleToRole(organizationRole) {
        switch (organizationRole) {
            case 'owner':
            case 'integrator':
                return 'admin';
            case 'manager':
                return 'moderator';
            case 'employee':
            default:
                return 'customer';
        }
    }
    mapRoleToOrganizationRole(role) {
        switch (role) {
            case 'admin':
                return 'integrator';
            case 'moderator':
                return 'manager';
            case 'customer':
            default:
                return 'employee';
        }
    }
    getDefaultPermissions(role) {
        switch (role) {
            case 'admin':
                return ['view_rocks', 'edit_rocks', 'view_issues', 'edit_issues', 'view_scorecard', 'edit_scorecard', 'admin'];
            case 'moderator':
                return ['view_rocks', 'edit_rocks', 'view_issues', 'edit_issues', 'view_scorecard'];
            case 'customer':
            default:
                return ['view_rocks', 'view_issues', 'view_scorecard'];
        }
    }
    // User CRUD operations
    async findById(id) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const result = await this.db
                .select()
                .from(eos_middleware_1.eosUsers)
                .where((0, drizzle_orm_1.eq)(eos_middleware_1.eosUsers.id, id))
                .limit(1);
            if (result.length === 0) {
                return null;
            }
            return this.mapEosUserToBaseUser(result[0]);
        }
        catch (error) {
            console.error('Error finding EOS user by ID:', error);
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
                .from(eos_middleware_1.eosUsers)
                .where((0, drizzle_orm_1.eq)(eos_middleware_1.eosUsers.email, email))
                .limit(1);
            if (result.length === 0) {
                return null;
            }
            return this.mapEosUserToBaseUser(result[0]);
        }
        catch (error) {
            console.error('Error finding EOS user by email:', error);
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
            const eosUserData = this.mapBaseUserToEosUser({
                ...userData,
                id: userData.id || this.generateId(),
                createdAt: new Date(),
                updatedAt: new Date()
            });
            const result = await this.db
                .insert(eos_middleware_1.eosUsers)
                .values(eosUserData)
                .returning();
            if (result.length === 0) {
                throw new types_1.AuthError('Failed to create EOS user', 'USER_CREATION_FAILED');
            }
            return this.mapEosUserToBaseUser(result[0]);
        }
        catch (error) {
            if (error instanceof types_1.ConflictError || error instanceof types_1.AuthError) {
                throw error;
            }
            console.error('Error creating EOS user:', error);
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
            const updateData = this.mapBaseUserToEosUser({
                ...userData,
                updatedAt: new Date()
            });
            // Remove undefined values
            const sanitizedData = this.sanitizeData(updateData);
            const result = await this.db
                .update(eos_middleware_1.eosUsers)
                .set(sanitizedData)
                .where((0, drizzle_orm_1.eq)(eos_middleware_1.eosUsers.id, id))
                .returning();
            if (result.length === 0) {
                throw new types_1.AuthError('Failed to update EOS user', 'USER_UPDATE_FAILED');
            }
            return this.mapEosUserToBaseUser(result[0]);
        }
        catch (error) {
            if (error instanceof types_1.NotFoundError || error instanceof types_1.AuthError) {
                throw error;
            }
            console.error('Error updating EOS user:', error);
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
                .delete(eos_middleware_1.eosUsers)
                .where((0, drizzle_orm_1.eq)(eos_middleware_1.eosUsers.id, id))
                .returning();
            return result.length > 0;
        }
        catch (error) {
            console.error('Error deleting EOS user:', error);
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
                .update(eos_middleware_1.eosUsers)
                .set({
                lastLoginAt: new Date(),
                updatedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(eos_middleware_1.eosUsers.id, id));
        }
        catch (error) {
            console.error('Error updating last login for EOS user:', error);
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
                .update(eos_middleware_1.eosUsers)
                .set({
                passwordHash,
                updatedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(eos_middleware_1.eosUsers.id, id));
        }
        catch (error) {
            if (error instanceof types_1.NotFoundError) {
                throw error;
            }
            console.error('Error updating password for EOS user:', error);
            throw new types_1.AuthError('Failed to update password', 'PASSWORD_UPDATE_FAILED');
        }
    }
    async updateEmailVerification(id, isVerified) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            await this.db
                .update(eos_middleware_1.eosUsers)
                .set({
                isVerified,
                updatedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(eos_middleware_1.eosUsers.id, id));
        }
        catch (error) {
            console.error('Error updating email verification for EOS user:', error);
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
                .from(eos_middleware_1.eosUsers)
                .where((0, drizzle_orm_1.or)(...ids.map(id => (0, drizzle_orm_1.eq)(eos_middleware_1.eosUsers.id, id))));
            return result.map(user => this.mapEosUserToBaseUser(user));
        }
        catch (error) {
            console.error('Error finding EOS users by IDs:', error);
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
                .from(eos_middleware_1.eosUsers);
            return result[0]?.count || 0;
        }
        catch (error) {
            console.error('Error counting EOS users:', error);
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
                .from(eos_middleware_1.eosUsers)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(eos_middleware_1.eosUsers.isVerified, true), (0, drizzle_orm_1.gt)(eos_middleware_1.eosUsers.lastLoginAt, thirtyDaysAgo)))
                .orderBy((0, drizzle_orm_1.desc)(eos_middleware_1.eosUsers.lastLoginAt))
                .limit(limit);
            return result.map(user => this.mapEosUserToBaseUser(user));
        }
        catch (error) {
            console.error('Error finding active EOS users:', error);
            return [];
        }
    }
    async findUsersByRole(role) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const organizationRole = this.mapRoleToOrganizationRole(role);
            const result = await this.db
                .select()
                .from(eos_middleware_1.eosUsers)
                .where((0, drizzle_orm_1.eq)(eos_middleware_1.eosUsers.organizationRole, organizationRole))
                .orderBy((0, drizzle_orm_1.asc)(eos_middleware_1.eosUsers.createdAt));
            return result.map(user => this.mapEosUserToBaseUser(user));
        }
        catch (error) {
            console.error('Error finding EOS users by role:', error);
            return [];
        }
    }
    async searchUsers(query, limit = 50) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            // Search by email (exact match for now)
            const result = await this.db
                .select()
                .from(eos_middleware_1.eosUsers)
                .where((0, drizzle_orm_1.eq)(eos_middleware_1.eosUsers.email, query))
                .limit(limit);
            return result.map(user => this.mapEosUserToBaseUser(user));
        }
        catch (error) {
            console.error('Error searching EOS users:', error);
            return [];
        }
    }
    // EOS-specific methods
    async updateEosPermissions(id, permissions) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            await this.db
                .update(eos_middleware_1.eosUsers)
                .set({
                eosPermissions: permissions,
                updatedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(eos_middleware_1.eosUsers.id, id));
        }
        catch (error) {
            console.error('Error updating EOS permissions:', error);
            throw new types_1.AuthError('Failed to update EOS permissions', 'PERMISSIONS_UPDATE_FAILED');
        }
    }
    async updateOrganizationRole(id, organizationRole) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            // Update permissions based on new role
            const permissions = this.getDefaultPermissions(this.mapOrganizationRoleToRole(organizationRole));
            await this.db
                .update(eos_middleware_1.eosUsers)
                .set({
                organizationRole,
                eosPermissions: permissions,
                updatedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(eos_middleware_1.eosUsers.id, id));
        }
        catch (error) {
            console.error('Error updating organization role:', error);
            throw new types_1.AuthError('Failed to update organization role', 'ROLE_UPDATE_FAILED');
        }
    }
    async findUsersByOrganizationRole(organizationRole) {
        try {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const result = await this.db
                .select()
                .from(eos_middleware_1.eosUsers)
                .where((0, drizzle_orm_1.eq)(eos_middleware_1.eosUsers.organizationRole, organizationRole))
                .orderBy((0, drizzle_orm_1.asc)(eos_middleware_1.eosUsers.createdAt));
            return result.map(user => this.mapEosUserToBaseUser(user));
        }
        catch (error) {
            console.error('Error finding users by organization role:', error);
            return [];
        }
    }
    // Set database instance (for dependency injection)
    setDatabase(db) {
        this.db = db;
    }
}
exports.EosUserRepository = EosUserRepository;
// Factory function for creating EosUserRepository
function createEosUserRepository(config, db) {
    return new EosUserRepository(config, db);
}
//# sourceMappingURL=EosUserRepository.js.map