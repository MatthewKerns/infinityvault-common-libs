import { drizzle } from 'drizzle-orm/node-postgres';
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
import { users, authSessions } from '@infinityvault/website-middleware';

/**
 * Website-specific user repository implementation
 */
export class WebsiteUserRepository extends AbstractRepository implements IUserRepository {
  private db: any; // Drizzle database instance

  constructor(config: any, db?: any) {
    super(config);
    if (db) {
      this.db = db;
    } else {
      // Initialize database connection if not provided
      // This would typically use the existing database connection from website middleware
      this.initializeDatabase();
    }
  }

  getContext(): DatabaseContext {
    return {
      type: 'website',
      connectionString: process.env.WEBSITE_DATABASE_URL
    };
  }

  async close(): Promise<void> {
    // Database connection managed by website middleware
    // No need to close here
  }

  async beginTransaction(): Promise<any> {
    // For now, return a mock transaction
    // In a real implementation, this would start a database transaction
    return { id: 'tx_' + Date.now() };
  }

  async commitTransaction(transaction: any): Promise<void> {
    // Commit transaction in real implementation
    console.log('Committing transaction:', transaction.id);
  }

  async rollbackTransaction(transaction: any): Promise<void> {
    // Rollback transaction in real implementation
    console.log('Rolling back transaction:', transaction.id);
  }

  private initializeDatabase(): void {
    // Initialize database connection using website middleware
    // This is a placeholder - would use actual database initialization
    console.log('Initializing website database connection');
  }

  private mapWebsiteUserToBaseUser(websiteUser: any): BaseUser {
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

  private mapBaseUserToWebsiteUser(baseUser: Partial<BaseUser>): any {
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
  async findById(id: string): Promise<BaseUser | null> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const result = await this.db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

      if (result.length === 0) {
        return null;
      }

      return this.mapWebsiteUserToBaseUser(result[0]);

    } catch (error) {
      console.error('Error finding user by ID:', error);
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
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (result.length === 0) {
        return null;
      }

      return this.mapWebsiteUserToBaseUser(result[0]);

    } catch (error) {
      console.error('Error finding user by email:', error);
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
      const websiteUserData = this.mapBaseUserToWebsiteUser({
        ...userData,
        id: userData.id || this.generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const result = await this.db
        .insert(users)
        .values(websiteUserData)
        .returning();

      if (result.length === 0) {
        throw new AuthError('Failed to create user', 'USER_CREATION_FAILED');
      }

      return this.mapWebsiteUserToBaseUser(result[0]);

    } catch (error) {
      if (error instanceof ConflictError || error instanceof AuthError) {
        throw error;
      }
      console.error('Error creating user:', error);
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
      const updateData = this.mapBaseUserToWebsiteUser({
        ...userData,
        updatedAt: new Date()
      });

      // Remove undefined values
      const sanitizedData = this.sanitizeData(updateData);

      const result = await this.db
        .update(users)
        .set(sanitizedData)
        .where(eq(users.id, id))
        .returning();

      if (result.length === 0) {
        throw new AuthError('Failed to update user', 'USER_UPDATE_FAILED');
      }

      return this.mapWebsiteUserToBaseUser(result[0]);

    } catch (error) {
      if (error instanceof NotFoundError || error instanceof AuthError) {
        throw error;
      }
      console.error('Error updating user:', error);
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
        .delete(users)
        .where(eq(users.id, id))
        .returning();

      return result.length > 0;

    } catch (error) {
      console.error('Error deleting user:', error);
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
        .update(users)
        .set({
          lastLoginAt: new Date(),
          updatedAt: new Date()
        })
        .where(eq(users.id, id));

    } catch (error) {
      console.error('Error updating last login:', error);
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
        .update(users)
        .set({
          passwordHash,
          updatedAt: new Date()
        })
        .where(eq(users.id, id));

    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error('Error updating password:', error);
      throw new AuthError('Failed to update password', 'PASSWORD_UPDATE_FAILED');
    }
  }

  async updateEmailVerification(id: string, isVerified: boolean): Promise<void> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      await this.db
        .update(users)
        .set({
          isVerified,
          updatedAt: new Date()
        })
        .where(eq(users.id, id));

    } catch (error) {
      console.error('Error updating email verification:', error);
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
        .from(users)
        .where(or(...ids.map(id => eq(users.id, id))));

      return result.map((user: any) => this.mapWebsiteUserToBaseUser(user));

    } catch (error) {
      console.error('Error finding users by IDs:', error);
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
        .from(users);

      return result[0]?.count || 0;

    } catch (error) {
      console.error('Error counting users:', error);
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
        .from(users)
        .where(
          and(
            eq(users.isVerified, true),
            gt(users.lastLoginAt, thirtyDaysAgo)
          )
        )
        .orderBy(desc(users.lastLoginAt))
        .limit(limit);

      return result.map((user: any) => this.mapWebsiteUserToBaseUser(user));

    } catch (error) {
      console.error('Error finding active users:', error);
      return [];
    }
  }

  async findUsersByRole(role: string): Promise<BaseUser[]> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const result = await this.db
        .select()
        .from(users)
        .where(eq(users.role, role))
        .orderBy(asc(users.createdAt));

      return result.map((user: any) => this.mapWebsiteUserToBaseUser(user));

    } catch (error) {
      console.error('Error finding users by role:', error);
      return [];
    }
  }

  async searchUsers(query: string, limit: number = 50): Promise<BaseUser[]> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      // Search by email, first name, or last name
      const searchPattern = `%${query.toLowerCase()}%`;

      const result = await this.db
        .select()
        .from(users)
        .where(
          or(
            eq(users.email, query), // Exact email match
            // For more advanced search, you'd use ILIKE or full-text search
            // This is a simplified version
          )
        )
        .limit(limit);

      return result.map((user: any) => this.mapWebsiteUserToBaseUser(user));

    } catch (error) {
      console.error('Error searching users:', error);
      return [];
    }
  }

  // Additional website-specific methods
  async findByPhoneNumber(phoneNumber: string): Promise<BaseUser | null> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const result = await this.db
        .select()
        .from(users)
        .where(eq(users.phoneNumber, phoneNumber))
        .limit(1);

      if (result.length === 0) {
        return null;
      }

      return this.mapWebsiteUserToBaseUser(result[0]);

    } catch (error) {
      console.error('Error finding user by phone number:', error);
      return null;
    }
  }

  async updateMarketingConsent(id: string, consent: boolean): Promise<void> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      await this.db
        .update(users)
        .set({
          marketingConsent: consent,
          updatedAt: new Date()
        })
        .where(eq(users.id, id));

    } catch (error) {
      console.error('Error updating marketing consent:', error);
      throw new AuthError('Failed to update marketing consent', 'CONSENT_UPDATE_FAILED');
    }
  }

  async updatePhoneVerification(id: string, phoneNumber: string, isVerified: boolean): Promise<void> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      await this.db
        .update(users)
        .set({
          phoneNumber,
          phoneVerified: isVerified,
          updatedAt: new Date()
        })
        .where(eq(users.id, id));

    } catch (error) {
      console.error('Error updating phone verification:', error);
      throw new AuthError('Failed to update phone verification', 'PHONE_UPDATE_FAILED');
    }
  }

  // Set database instance (for dependency injection)
  setDatabase(db: any): void {
    this.db = db;
  }
}

// Factory function for creating WebsiteUserRepository
export function createWebsiteUserRepository(config: any, db?: any): WebsiteUserRepository {
  return new WebsiteUserRepository(config, db);
}