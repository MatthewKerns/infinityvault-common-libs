import { eq, and, gt, lt, desc, count, or } from 'drizzle-orm';
import {
  RememberMeToken,
  DatabaseContext,
  AuthError,
  NotFoundError
} from '../../types';
import { AbstractRepository, IRememberMeRepository } from '../../repositories';
import { rememberMeTokens } from '@infinityvault/website-middleware';

/**
 * Website-specific remember me token repository implementation
 */
export class WebsiteRememberMeRepository extends AbstractRepository implements IRememberMeRepository {
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
    console.log('Initializing website database connection for remember me tokens');
  }

  private mapWebsiteTokenToRememberMeToken(websiteToken: any): RememberMeToken {
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

  private mapRememberMeTokenToWebsiteToken(token: Partial<RememberMeToken>): any {
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
  async create(tokenData: Partial<RememberMeToken>): Promise<RememberMeToken> {
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
        .insert(rememberMeTokens)
        .values(websiteTokenData)
        .returning();

      if (result.length === 0) {
        throw new AuthError('Failed to create remember me token', 'TOKEN_CREATION_FAILED');
      }

      return this.mapWebsiteTokenToRememberMeToken(result[0]);

    } catch (error) {
      console.error('Error creating remember me token:', error);
      throw new AuthError('Failed to create remember me token', 'TOKEN_CREATION_FAILED');
    }
  }

  async findByTokenHash(tokenHash: string): Promise<RememberMeToken | null> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const result = await this.db
        .select()
        .from(rememberMeTokens)
        .where(eq(rememberMeTokens.tokenHash, tokenHash))
        .limit(1);

      if (result.length === 0) {
        return null;
      }

      return this.mapWebsiteTokenToRememberMeToken(result[0]);

    } catch (error) {
      console.error('Error finding remember me token by hash:', error);
      return null;
    }
  }

  async findBySeries(series: string): Promise<RememberMeToken | null> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const result = await this.db
        .select()
        .from(rememberMeTokens)
        .where(
          and(
            eq(rememberMeTokens.series, series),
            eq(rememberMeTokens.isActive, true),
            gt(rememberMeTokens.expiresAt, new Date())
          )
        )
        .orderBy(desc(rememberMeTokens.createdAt))
        .limit(1);

      if (result.length === 0) {
        return null;
      }

      return this.mapWebsiteTokenToRememberMeToken(result[0]);

    } catch (error) {
      console.error('Error finding remember me token by series:', error);
      return null;
    }
  }

  async findByUserId(userId: string): Promise<RememberMeToken[]> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const result = await this.db
        .select()
        .from(rememberMeTokens)
        .where(eq(rememberMeTokens.userId, userId))
        .orderBy(desc(rememberMeTokens.createdAt));

      return result.map(token => this.mapWebsiteTokenToRememberMeToken(token));

    } catch (error) {
      console.error('Error finding remember me tokens by user ID:', error);
      return [];
    }
  }

  async update(tokenHash: string, tokenData: Partial<RememberMeToken>): Promise<RememberMeToken> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      // Check if token exists
      const existingToken = await this.findByTokenHash(tokenHash);
      if (!existingToken) {
        throw new NotFoundError('Remember me token', tokenHash);
      }

      // Prepare update data
      const updateData = this.mapRememberMeTokenToWebsiteToken(tokenData);

      // Remove undefined values
      const sanitizedData = this.sanitizeData(updateData);

      const result = await this.db
        .update(rememberMeTokens)
        .set(sanitizedData)
        .where(eq(rememberMeTokens.tokenHash, tokenHash))
        .returning();

      if (result.length === 0) {
        throw new AuthError('Failed to update remember me token', 'TOKEN_UPDATE_FAILED');
      }

      return this.mapWebsiteTokenToRememberMeToken(result[0]);

    } catch (error) {
      if (error instanceof NotFoundError || error instanceof AuthError) {
        throw error;
      }
      console.error('Error updating remember me token:', error);
      throw new AuthError('Failed to update remember me token', 'TOKEN_UPDATE_FAILED');
    }
  }

  async delete(tokenHash: string): Promise<boolean> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const result = await this.db
        .delete(rememberMeTokens)
        .where(eq(rememberMeTokens.tokenHash, tokenHash))
        .returning();

      return result.length > 0;

    } catch (error) {
      console.error('Error deleting remember me token:', error);
      return false;
    }
  }

  // Remember me token management
  async invalidateToken(tokenHash: string): Promise<void> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      await this.db
        .update(rememberMeTokens)
        .set({
          isActive: false,
          lastUsedAt: new Date()
        })
        .where(eq(rememberMeTokens.tokenHash, tokenHash));

    } catch (error) {
      console.error('Error invalidating remember me token:', error);
      // Don't throw - invalidation should be idempotent
    }
  }

  async invalidateAllUserTokens(userId: string): Promise<void> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      await this.db
        .update(rememberMeTokens)
        .set({
          isActive: false,
          lastUsedAt: new Date()
        })
        .where(eq(rememberMeTokens.userId, userId));

    } catch (error) {
      console.error('Error invalidating all user tokens:', error);
      // Don't throw - this is a cleanup operation
    }
  }

  async cleanupExpiredTokens(): Promise<number> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const now = new Date();
      const result = await this.db
        .delete(rememberMeTokens)
        .where(
          or(
            lt(rememberMeTokens.expiresAt, now),
            eq(rememberMeTokens.isActive, false)
          )
        )
        .returning();

      return result.length;

    } catch (error) {
      console.error('Error cleaning up expired remember me tokens:', error);
      return 0;
    }
  }

  async updateLastUsed(tokenHash: string): Promise<void> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      await this.db
        .update(rememberMeTokens)
        .set({
          lastUsedAt: new Date()
        })
        .where(eq(rememberMeTokens.tokenHash, tokenHash));

    } catch (error) {
      console.error('Error updating token last used:', error);
      // Don't throw - this is for tracking purposes
    }
  }

  // Token rotation support
  async rotateToken(oldTokenHash: string, newTokenData: Partial<RememberMeToken>): Promise<RememberMeToken> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      // Get the old token to preserve series and user ID
      const oldToken = await this.findByTokenHash(oldTokenHash);
      if (!oldToken) {
        throw new NotFoundError('Remember me token', oldTokenHash);
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

    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error('Error rotating remember me token:', error);
      throw new AuthError('Failed to rotate remember me token', 'TOKEN_ROTATION_FAILED');
    }
  }

  // Analytics and limits
  async getUserTokenCount(userId: string): Promise<number> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const now = new Date();
      const result = await this.db
        .select({ count: count() })
        .from(rememberMeTokens)
        .where(
          and(
            eq(rememberMeTokens.userId, userId),
            eq(rememberMeTokens.isActive, true),
            gt(rememberMeTokens.expiresAt, now)
          )
        );

      return result[0]?.count || 0;

    } catch (error) {
      console.error('Error getting user token count:', error);
      return 0;
    }
  }

  async cleanupExcessTokens(userId: string, maxTokens: number): Promise<number> {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      // Get active tokens for user, oldest first
      const now = new Date();
      const tokens = await this.db
        .select()
        .from(rememberMeTokens)
        .where(
          and(
            eq(rememberMeTokens.userId, userId),
            eq(rememberMeTokens.isActive, true),
            gt(rememberMeTokens.expiresAt, now)
          )
        )
        .orderBy(rememberMeTokens.createdAt); // Oldest first

      if (tokens.length <= maxTokens) {
        return 0; // No cleanup needed
      }

      // Invalidate excess tokens (oldest ones)
      const tokensToRemove = tokens.slice(0, tokens.length - maxTokens);
      const tokenHashesToRemove = tokensToRemove.map(token => token.tokenHash);

      if (tokenHashesToRemove.length > 0) {
        await this.db
          .update(rememberMeTokens)
          .set({
            isActive: false,
            lastUsedAt: new Date()
          })
          .where(
            and(
              eq(rememberMeTokens.userId, userId),
              or(...tokenHashesToRemove.map(hash => eq(rememberMeTokens.tokenHash, hash)))
            )
          );
      }

      return tokenHashesToRemove.length;

    } catch (error) {
      console.error('Error cleaning up excess tokens:', error);
      return 0;
    }
  }

  // Set database instance (for dependency injection)
  setDatabase(db: any): void {
    this.db = db;
  }
}

// Factory function for creating WebsiteRememberMeRepository
export function createWebsiteRememberMeRepository(config: any, db?: any): WebsiteRememberMeRepository {
  return new WebsiteRememberMeRepository(config, db);
}