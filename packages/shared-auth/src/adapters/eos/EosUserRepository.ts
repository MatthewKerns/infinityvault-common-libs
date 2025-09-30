import { eq, and, or, gt, desc, asc, count } from 'drizzle-orm';
import {
  BaseUser,
  DatabaseContext,
  AuthError,
  NotFoundError,
  ConflictError,
  ValidationError
} from '../../types';
import { AbstractRepository, IUserRepository } from '../../repositories';
import { eosUsers, eosAuthSessions } from '@infinityvault/eos-middleware';

/**
 * EOS-specific user repository implementation
 */
export class EosUserRepository extends AbstractRepository implements IUserRepository {
  private db: any; // Drizzle database instance

  constructor(config: any, db?: any) {
    super(config);
    if (db) {
      this.db = db;
    } else {
      this.initializeDatabase();
    }
  }

  getContext(): DatabaseContext {
    return {
      type: 'eos',
      connectionString: process.env.EOS_DATABASE_URL
    };
  }

  async close(): Promise<void> {
    // Database connection managed by EOS middleware
  }

  async beginTransaction(): Promise<any> {
    return { id: 'tx_' + Date.now() };
  }

  async commitTransaction(transaction: any): Promise<void> {
    console.log('Committing transaction:', transaction.id);
  }

  async rollbackTransaction(transaction: any): Promise<void> {
    console.log('Rolling back transaction:', transaction.id);
  }

  private initializeDatabase(): void {
    console.log('Initializing EOS database connection');
  }

  private mapEosUserToBaseUser(eosUser: any): BaseUser {
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

  private mapBaseUserToEosUser(baseUser: Partial<BaseUser>): any {
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

  private mapOrganizationRoleToRole(organizationRole?: string): 'customer' | 'admin' | 'moderator' {
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

  private mapRoleToOrganizationRole(role?: string): string {
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

  private getDefaultPermissions(role?: string): string[] {
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
  async findById(id: string): Promise<BaseUser | null> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const result = await this.db
        .select()
        .from(eosUsers)
        .where(eq(eosUsers.id, id))
        .limit(1);

      if (result.length === 0) {
        return null;
      }

      return this.mapEosUserToBaseUser(result[0]);

    } catch (error) {
      console.error('Error finding EOS user by ID:', error);
      throw new AuthError('Failed to find user', 'USER_LOOKUP_FAILED');
    }
  }

  async findByEmail(email: string): Promise<BaseUser | null> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const result = await this.db
        .select()
        .from(eosUsers)
        .where(eq(eosUsers.email, email))
        .limit(1);

      if (result.length === 0) {
        return null;
      }

      return this.mapEosUserToBaseUser(result[0]);

    } catch (error) {
      console.error('Error finding EOS user by email:', error);
      throw new AuthError('Failed to find user', 'USER_LOOKUP_FAILED');
    }
  }

  async create(userData: Partial<BaseUser>): Promise<BaseUser> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      // Validate required fields
      this.validateRequiredFields(userData, ['email']);

      // Check if user already exists
      const existingUser = await this.findByEmail(userData.email!);
      if (existingUser) {
        throw new ConflictError('User', 'email', userData.email!);
      }

      // Prepare user data for insertion
      const eosUserData = this.mapBaseUserToEosUser({
        ...userData,
        id: userData.id || this.generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const result = await this.db
        .insert(eosUsers)
        .values(eosUserData)
        .returning();

      if (result.length === 0) {
        throw new AuthError('Failed to create EOS user', 'USER_CREATION_FAILED');
      }

      return this.mapEosUserToBaseUser(result[0]);

    } catch (error) {
      if (error instanceof ConflictError || error instanceof AuthError) {
        throw error;
      }
      console.error('Error creating EOS user:', error);
      throw new AuthError('Failed to create user', 'USER_CREATION_FAILED');
    }
  }

  async update(id: string, userData: Partial<BaseUser>): Promise<BaseUser> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      // Check if user exists
      const existingUser = await this.findById(id);
      if (!existingUser) {
        throw new NotFoundError('User', id);
      }

      // Prepare update data
      const updateData = this.mapBaseUserToEosUser({
        ...userData,
        updatedAt: new Date()
      });

      // Remove undefined values
      const sanitizedData = this.sanitizeData(updateData);

      const result = await this.db
        .update(eosUsers)
        .set(sanitizedData)
        .where(eq(eosUsers.id, id))
        .returning();

      if (result.length === 0) {
        throw new AuthError('Failed to update EOS user', 'USER_UPDATE_FAILED');
      }

      return this.mapEosUserToBaseUser(result[0]);

    } catch (error) {
      if (error instanceof NotFoundError || error instanceof AuthError) {
        throw error;
      }
      console.error('Error updating EOS user:', error);
      throw new AuthError('Failed to update user', 'USER_UPDATE_FAILED');
    }
  }

  async delete(id: string): Promise<boolean> {
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
        .delete(eosUsers)
        .where(eq(eosUsers.id, id))
        .returning();

      return result.length > 0;

    } catch (error) {
      console.error('Error deleting EOS user:', error);
      throw new AuthError('Failed to delete user', 'USER_DELETION_FAILED');
    }
  }

  // Authentication-specific user operations
  async updateLastLogin(id: string): Promise<void> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      await this.db
        .update(eosUsers)
        .set({
          lastLoginAt: new Date(),
          updatedAt: new Date()
        })
        .where(eq(eosUsers.id, id));

    } catch (error) {
      console.error('Error updating last login for EOS user:', error);
      // Don't throw - this is not critical
    }
  }

  async updatePassword(id: string, passwordHash: string): Promise<void> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      // Check if user exists
      const existingUser = await this.findById(id);
      if (!existingUser) {
        throw new NotFoundError('User', id);
      }

      await this.db
        .update(eosUsers)
        .set({
          passwordHash,
          updatedAt: new Date()
        })
        .where(eq(eosUsers.id, id));

    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error('Error updating password for EOS user:', error);
      throw new AuthError('Failed to update password', 'PASSWORD_UPDATE_FAILED');
    }
  }

  async updateEmailVerification(id: string, isVerified: boolean): Promise<void> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      await this.db
        .update(eosUsers)
        .set({
          isVerified,
          updatedAt: new Date()
        })
        .where(eq(eosUsers.id, id));

    } catch (error) {
      console.error('Error updating email verification for EOS user:', error);
      throw new AuthError('Failed to update email verification', 'VERIFICATION_UPDATE_FAILED');
    }
  }

  // Bulk operations
  async findByIds(ids: string[]): Promise<BaseUser[]> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      if (ids.length === 0) {
        return [];
      }

      const result = await this.db
        .select()
        .from(eosUsers)
        .where(or(...ids.map(id => eq(eosUsers.id, id))));

      return result.map((user: any) => this.mapEosUserToBaseUser(user));

    } catch (error) {
      console.error('Error finding EOS users by IDs:', error);
      throw new AuthError('Failed to find users', 'USER_LOOKUP_FAILED');
    }
  }

  async countUsers(): Promise<number> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const result = await this.db
        .select({ count: count() })
        .from(eosUsers);

      return result[0]?.count || 0;

    } catch (error) {
      console.error('Error counting EOS users:', error);
      return 0;
    }
  }

  // Advanced queries
  async findActiveUsers(limit: number = 100): Promise<BaseUser[]> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      // Define "active" as users who have logged in within the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const result = await this.db
        .select()
        .from(eosUsers)
        .where(
          and(
            eq(eosUsers.isVerified, true),
            gt(eosUsers.lastLoginAt, thirtyDaysAgo)
          )
        )
        .orderBy(desc(eosUsers.lastLoginAt))
        .limit(limit);

      return result.map((user: any) => this.mapEosUserToBaseUser(user));

    } catch (error) {
      console.error('Error finding active EOS users:', error);
      return [];
    }
  }

  async findUsersByRole(role: string): Promise<BaseUser[]> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const organizationRole = this.mapRoleToOrganizationRole(role);

      const result = await this.db
        .select()
        .from(eosUsers)
        .where(eq(eosUsers.organizationRole, organizationRole))
        .orderBy(asc(eosUsers.createdAt));

      return result.map((user: any) => this.mapEosUserToBaseUser(user));

    } catch (error) {
      console.error('Error finding EOS users by role:', error);
      return [];
    }
  }

  async searchUsers(query: string, limit: number = 50): Promise<BaseUser[]> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      // Search by email (exact match for now)
      const result = await this.db
        .select()
        .from(eosUsers)
        .where(eq(eosUsers.email, query))
        .limit(limit);

      return result.map((user: any) => this.mapEosUserToBaseUser(user));

    } catch (error) {
      console.error('Error searching EOS users:', error);
      return [];
    }
  }

  // EOS-specific methods
  async updateEosPermissions(id: string, permissions: string[]): Promise<void> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      await this.db
        .update(eosUsers)
        .set({
          eosPermissions: permissions,
          updatedAt: new Date()
        })
        .where(eq(eosUsers.id, id));

    } catch (error) {
      console.error('Error updating EOS permissions:', error);
      throw new AuthError('Failed to update EOS permissions', 'PERMISSIONS_UPDATE_FAILED');
    }
  }

  async updateOrganizationRole(id: string, organizationRole: string): Promise<void> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      // Update permissions based on new role
      const permissions = this.getDefaultPermissions(this.mapOrganizationRoleToRole(organizationRole));

      await this.db
        .update(eosUsers)
        .set({
          organizationRole,
          eosPermissions: permissions,
          updatedAt: new Date()
        })
        .where(eq(eosUsers.id, id));

    } catch (error) {
      console.error('Error updating organization role:', error);
      throw new AuthError('Failed to update organization role', 'ROLE_UPDATE_FAILED');
    }
  }

  async findUsersByOrganizationRole(organizationRole: string): Promise<BaseUser[]> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const result = await this.db
        .select()
        .from(eosUsers)
        .where(eq(eosUsers.organizationRole, organizationRole))
        .orderBy(asc(eosUsers.createdAt));

      return result.map((user: any) => this.mapEosUserToBaseUser(user));

    } catch (error) {
      console.error('Error finding users by organization role:', error);
      return [];
    }
  }

  // Set database instance (for dependency injection)
  setDatabase(db: any): void {
    this.db = db;
  }
}

// Factory function for creating EosUserRepository
export function createEosUserRepository(config: any, db?: any): EosUserRepository {
  return new EosUserRepository(config, db);
}