import { eq, and, gt, lt, desc, count } from 'drizzle-orm';
import {
  AuthSession,
  BaseUser,
  DatabaseContext,
  AuthError,
  NotFoundError
} from '../../types';
import { AbstractRepository, ISessionRepository } from '../../repositories';
import { authSessions, users } from '@infinityvault/website-middleware';

/**
 * Website-specific session repository implementation
 */
export class WebsiteSessionRepository extends AbstractRepository implements ISessionRepository {
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
      type: 'website',
      connectionString: process.env.WEBSITE_DATABASE_URL
    };
  }

  async close(): Promise<void> {
    // Database connection managed by website middleware
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
    console.log('Initializing website database connection for sessions');
  }

  private mapWebsiteSessionToAuthSession(websiteSession: any): AuthSession {
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

  private mapAuthSessionToWebsiteSession(authSession: Partial<AuthSession>): any {
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
  async create(sessionData: Partial<AuthSession>): Promise<AuthSession> {
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
        .insert(authSessions)
        .values(websiteSessionData)
        .returning();

      if (result.length === 0) {
        throw new AuthError('Failed to create session', 'SESSION_CREATION_FAILED');
      }

      return this.mapWebsiteSessionToAuthSession(result[0]);

    } catch (error) {
      console.error('Error creating session:', error);
      throw new AuthError('Failed to create session', 'SESSION_CREATION_FAILED');
    }
  }

  async findByToken(sessionToken: string): Promise<AuthSession | null> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const result = await this.db
        .select()
        .from(authSessions)
        .where(eq(authSessions.sessionToken, sessionToken))
        .limit(1);

      if (result.length === 0) {
        return null;
      }

      return this.mapWebsiteSessionToAuthSession(result[0]);

    } catch (error) {
      console.error('Error finding session by token:', error);
      return null;
    }
  }

  async findByUserId(userId: string): Promise<AuthSession[]> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const result = await this.db
        .select()
        .from(authSessions)
        .where(eq(authSessions.userId, userId))
        .orderBy(desc(authSessions.createdAt));

      return result.map(session => this.mapWebsiteSessionToAuthSession(session));

    } catch (error) {
      console.error('Error finding sessions by user ID:', error);
      return [];
    }
  }

  async update(sessionToken: string, sessionData: Partial<AuthSession>): Promise<AuthSession> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      // Check if session exists
      const existingSession = await this.findByToken(sessionToken);
      if (!existingSession) {
        throw new NotFoundError('Session', sessionToken);
      }

      // Prepare update data
      const updateData = this.mapAuthSessionToWebsiteSession({
        ...sessionData,
        updatedAt: new Date()
      });

      // Remove undefined values
      const sanitizedData = this.sanitizeData(updateData);

      const result = await this.db
        .update(authSessions)
        .set(sanitizedData)
        .where(eq(authSessions.sessionToken, sessionToken))
        .returning();

      if (result.length === 0) {
        throw new AuthError('Failed to update session', 'SESSION_UPDATE_FAILED');
      }

      return this.mapWebsiteSessionToAuthSession(result[0]);

    } catch (error) {
      if (error instanceof NotFoundError || error instanceof AuthError) {
        throw error;
      }
      console.error('Error updating session:', error);
      throw new AuthError('Failed to update session', 'SESSION_UPDATE_FAILED');
    }
  }

  async delete(sessionToken: string): Promise<boolean> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const result = await this.db
        .delete(authSessions)
        .where(eq(authSessions.sessionToken, sessionToken))
        .returning();

      return result.length > 0;

    } catch (error) {
      console.error('Error deleting session:', error);
      return false;
    }
  }

  // Session management operations
  async invalidateSession(sessionToken: string): Promise<void> {
    try {
      await this.delete(sessionToken);
    } catch (error) {
      console.error('Error invalidating session:', error);
      // Don't throw - invalidation should be idempotent
    }
  }

  async invalidateAllUserSessions(userId: string): Promise<void> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      await this.db
        .delete(authSessions)
        .where(eq(authSessions.userId, userId));

    } catch (error) {
      console.error('Error invalidating all user sessions:', error);
      // Don't throw - this is a cleanup operation
    }
  }

  async cleanupExpiredSessions(): Promise<number> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const now = new Date();
      const result = await this.db
        .delete(authSessions)
        .where(lt(authSessions.expiresAt, now))
        .returning();

      return result.length;

    } catch (error) {
      console.error('Error cleaning up expired sessions:', error);
      return 0;
    }
  }

  async extendSession(sessionToken: string, expiresAt: Date): Promise<void> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      await this.db
        .update(authSessions)
        .set({
          expiresAt,
          updatedAt: new Date()
        })
        .where(eq(authSessions.sessionToken, sessionToken));

    } catch (error) {
      console.error('Error extending session:', error);
      throw new AuthError('Failed to extend session', 'SESSION_EXTENSION_FAILED');
    }
  }

  // Session analytics
  async getActiveSessions(): Promise<AuthSession[]> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const now = new Date();
      const result = await this.db
        .select()
        .from(authSessions)
        .where(gt(authSessions.expiresAt, now))
        .orderBy(desc(authSessions.createdAt));

      return result.map(session => this.mapWebsiteSessionToAuthSession(session));

    } catch (error) {
      console.error('Error getting active sessions:', error);
      return [];
    }
  }

  async getUserSessionCount(userId: string): Promise<number> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const now = new Date();
      const result = await this.db
        .select({ count: count() })
        .from(authSessions)
        .where(
          and(
            eq(authSessions.userId, userId),
            gt(authSessions.expiresAt, now)
          )
        );

      return result[0]?.count || 0;

    } catch (error) {
      console.error('Error getting user session count:', error);
      return 0;
    }
  }

  async getSessionStats(): Promise<{
    total: number;
    active: number;
    expired: number;
  }> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const now = new Date();

      // Get total sessions
      const totalResult = await this.db
        .select({ count: count() })
        .from(authSessions);
      const total = totalResult[0]?.count || 0;

      // Get active sessions
      const activeResult = await this.db
        .select({ count: count() })
        .from(authSessions)
        .where(gt(authSessions.expiresAt, now));
      const active = activeResult[0]?.count || 0;

      const expired = total - active;

      return { total, active, expired };

    } catch (error) {
      console.error('Error getting session stats:', error);
      return { total: 0, active: 0, expired: 0 };
    }
  }

  // User lookup through session
  async findUserBySessionToken(sessionToken: string): Promise<BaseUser | null> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const now = new Date();
      const result = await this.db
        .select({
          user: users,
          session: authSessions
        })
        .from(authSessions)
        .innerJoin(users, eq(authSessions.userId, users.id))
        .where(
          and(
            eq(authSessions.sessionToken, sessionToken),
            gt(authSessions.expiresAt, now)
          )
        )
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

    } catch (error) {
      console.error('Error finding user by session token:', error);
      return null;
    }
  }

  // Additional website-specific methods
  async findSessionsByIPAddress(ipAddress: string, timeframe: number = 24): Promise<AuthSession[]> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const timeframeStart = new Date();
      timeframeStart.setHours(timeframeStart.getHours() - timeframe);

      const result = await this.db
        .select()
        .from(authSessions)
        .where(
          and(
            eq(authSessions.ipAddress, ipAddress),
            gt(authSessions.createdAt, timeframeStart)
          )
        )
        .orderBy(desc(authSessions.createdAt));

      return result.map(session => this.mapWebsiteSessionToAuthSession(session));

    } catch (error) {
      console.error('Error finding sessions by IP address:', error);
      return [];
    }
  }

  async updateSessionActivity(sessionToken: string): Promise<void> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      await this.db
        .update(authSessions)
        .set({
          updatedAt: new Date()
        })
        .where(eq(authSessions.sessionToken, sessionToken));

    } catch (error) {
      console.error('Error updating session activity:', error);
      // Don't throw - this is for tracking purposes
    }
  }

  // Set database instance (for dependency injection)
  setDatabase(db: any): void {
    this.db = db;
  }
}

// Factory function for creating WebsiteSessionRepository
export function createWebsiteSessionRepository(config: any, db?: any): WebsiteSessionRepository {
  return new WebsiteSessionRepository(config, db);
}