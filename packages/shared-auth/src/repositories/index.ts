import {
  BaseUser,
  AuthSession,
  RememberMeToken,
  SessionOptions,
  DatabaseContext
} from '../types';

/**
 * Repository interfaces for authentication data access
 * These interfaces abstract database operations and allow for different implementations
 * across website and EOS systems while maintaining consistent behavior
 */

// Base repository interface with common database operations
export interface BaseRepository {
  getContext(): DatabaseContext;
  close(): Promise<void>;
  beginTransaction(): Promise<any>;
  commitTransaction(transaction: any): Promise<void>;
  rollbackTransaction(transaction: any): Promise<void>;
}

// User repository interface
export interface IUserRepository extends BaseRepository {
  // User CRUD operations
  findById(id: string): Promise<BaseUser | null>;
  findByEmail(email: string): Promise<BaseUser | null>;
  create(userData: Partial<BaseUser>): Promise<BaseUser>;
  update(id: string, userData: Partial<BaseUser>): Promise<BaseUser>;
  delete(id: string): Promise<boolean>;

  // Authentication-specific user operations
  updateLastLogin(id: string): Promise<void>;
  updatePassword(id: string, passwordHash: string): Promise<void>;
  updateEmailVerification(id: string, isVerified: boolean): Promise<void>;

  // Bulk operations
  findByIds(ids: string[]): Promise<BaseUser[]>;
  countUsers(): Promise<number>;

  // Advanced queries
  findActiveUsers(limit?: number): Promise<BaseUser[]>;
  findUsersByRole(role: string): Promise<BaseUser[]>;
  searchUsers(query: string, limit?: number): Promise<BaseUser[]>;
}

// Session repository interface
export interface ISessionRepository extends BaseRepository {
  // Session CRUD operations
  create(sessionData: Partial<AuthSession>): Promise<AuthSession>;
  findByToken(sessionToken: string): Promise<AuthSession | null>;
  findByUserId(userId: string): Promise<AuthSession[]>;
  update(sessionToken: string, sessionData: Partial<AuthSession>): Promise<AuthSession>;
  delete(sessionToken: string): Promise<boolean>;

  // Session management operations
  invalidateSession(sessionToken: string): Promise<void>;
  invalidateAllUserSessions(userId: string): Promise<void>;
  cleanupExpiredSessions(): Promise<number>;
  extendSession(sessionToken: string, expiresAt: Date): Promise<void>;

  // Session analytics
  getActiveSessions(): Promise<AuthSession[]>;
  getUserSessionCount(userId: string): Promise<number>;
  getSessionStats(): Promise<{
    total: number;
    active: number;
    expired: number;
  }>;

  // User lookup through session
  findUserBySessionToken(sessionToken: string): Promise<BaseUser | null>;
}

// Remember me token repository interface
export interface IRememberMeRepository extends BaseRepository {
  // Remember me token CRUD operations
  create(tokenData: Partial<RememberMeToken>): Promise<RememberMeToken>;
  findByTokenHash(tokenHash: string): Promise<RememberMeToken | null>;
  findBySeries(series: string): Promise<RememberMeToken | null>;
  findByUserId(userId: string): Promise<RememberMeToken[]>;
  update(tokenHash: string, tokenData: Partial<RememberMeToken>): Promise<RememberMeToken>;
  delete(tokenHash: string): Promise<boolean>;

  // Remember me token management
  invalidateToken(tokenHash: string): Promise<void>;
  invalidateAllUserTokens(userId: string): Promise<void>;
  cleanupExpiredTokens(): Promise<number>;
  updateLastUsed(tokenHash: string): Promise<void>;

  // Token rotation support
  rotateToken(oldTokenHash: string, newTokenData: Partial<RememberMeToken>): Promise<RememberMeToken>;

  // Analytics and limits
  getUserTokenCount(userId: string): Promise<number>;
  cleanupExcessTokens(userId: string, maxTokens: number): Promise<number>;
}

// Rate limiting repository interface
export interface IRateLimitRepository extends BaseRepository {
  // Rate limiting operations
  getAttemptCount(key: string, windowMs: number): Promise<number>;
  incrementAttempts(key: string, windowMs: number): Promise<number>;
  resetAttempts(key: string): Promise<void>;

  // IP-based rate limiting
  getIPAttempts(ipAddress: string, action: string, windowMs: number): Promise<number>;
  incrementIPAttempts(ipAddress: string, action: string, windowMs: number): Promise<number>;

  // User-based rate limiting
  getUserAttempts(userId: string, action: string, windowMs: number): Promise<number>;
  incrementUserAttempts(userId: string, action: string, windowMs: number): Promise<number>;

  // Block management
  isBlocked(key: string): Promise<boolean>;
  blockKey(key: string, durationMs: number): Promise<void>;
  unblockKey(key: string): Promise<void>;

  // Cleanup
  cleanupExpiredEntries(): Promise<number>;
}

// Audit log repository interface (for security tracking)
export interface IAuditRepository extends BaseRepository {
  // Audit log operations
  logAuthEvent(event: {
    userId?: string;
    action: string;
    ipAddress?: string;
    userAgent?: string;
    success: boolean;
    metadata?: any;
  }): Promise<void>;

  logSecurityEvent(event: {
    userId?: string;
    eventType: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    ipAddress?: string;
    userAgent?: string;
    metadata?: any;
  }): Promise<void>;

  // Query audit logs
  getAuthEvents(filters: {
    userId?: string;
    action?: string;
    success?: boolean;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }): Promise<any[]>;

  getSecurityEvents(filters: {
    userId?: string;
    eventType?: string;
    severity?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }): Promise<any[]>;

  // Analytics
  getFailedLoginAttempts(timeframe: number): Promise<number>;
  getSuspiciousActivity(timeframe: number): Promise<any[]>;
}

// Composite repository interface that combines all repositories
export interface IAuthRepositories {
  user: IUserRepository;
  session: ISessionRepository;
  rememberMe: IRememberMeRepository;
  rateLimit: IRateLimitRepository;
  audit: IAuditRepository;

  // Transaction support across repositories
  withTransaction<T>(callback: (repos: IAuthRepositories) => Promise<T>): Promise<T>;

  // Cleanup operations
  performMaintenance(): Promise<{
    expiredSessions: number;
    expiredTokens: number;
    expiredRateLimits: number;
  }>;
}

// Factory interface for creating repository instances
export interface IRepositoryFactory {
  createUserRepository(context: DatabaseContext): IUserRepository;
  createSessionRepository(context: DatabaseContext): ISessionRepository;
  createRememberMeRepository(context: DatabaseContext): IRememberMeRepository;
  createRateLimitRepository(context: DatabaseContext): IRateLimitRepository;
  createAuditRepository(context: DatabaseContext): IAuditRepository;
  createAuthRepositories(context: DatabaseContext): IAuthRepositories;
}

// Configuration for repository implementations
export interface RepositoryConfig {
  database: DatabaseContext;
  caching?: {
    enabled: boolean;
    ttl: number;
    maxSize?: number;
  };
  audit?: {
    enabled: boolean;
    level: 'basic' | 'detailed' | 'comprehensive';
  };
  cleanup?: {
    enabled: boolean;
    intervalMs: number;
    batchSize: number;
  };
}

// Abstract base class for common repository functionality
export abstract class AbstractRepository implements BaseRepository {
  protected config: RepositoryConfig;

  constructor(config: RepositoryConfig) {
    this.config = config;
  }

  abstract getContext(): DatabaseContext;
  abstract close(): Promise<void>;
  abstract beginTransaction(): Promise<any>;
  abstract commitTransaction(transaction: any): Promise<void>;
  abstract rollbackTransaction(transaction: any): Promise<void>;

  // Common utility methods
  protected generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  protected validateRequiredFields(data: any, fields: string[]): void {
    for (const field of fields) {
      if (!data[field]) {
        throw new Error(`Required field '${field}' is missing`);
      }
    }
  }

  protected sanitizeData(data: any): any {
    // Remove undefined values and sanitize input
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }
}

// Repository-specific errors - extend base errors from types
import { NotFoundError, ConflictError, ValidationError } from '../types';

export class RepositoryError extends Error {
  constructor(
    message: string,
    public operation: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'RepositoryError';
  }
}

// Re-export the base error types for convenience
export { NotFoundError, ConflictError, ValidationError };