import { BaseUser, AuthSession, RememberMeToken, DatabaseContext } from '../types';
/**
 * Repository interfaces for authentication data access
 * These interfaces abstract database operations and allow for different implementations
 * across website and EOS systems while maintaining consistent behavior
 */
export interface BaseRepository {
    getContext(): DatabaseContext;
    close(): Promise<void>;
    beginTransaction(): Promise<any>;
    commitTransaction(transaction: any): Promise<void>;
    rollbackTransaction(transaction: any): Promise<void>;
}
export interface IUserRepository extends BaseRepository {
    findById(id: string): Promise<BaseUser | null>;
    findByEmail(email: string): Promise<BaseUser | null>;
    create(userData: Partial<BaseUser>): Promise<BaseUser>;
    update(id: string, userData: Partial<BaseUser>): Promise<BaseUser>;
    delete(id: string): Promise<boolean>;
    updateLastLogin(id: string): Promise<void>;
    updatePassword(id: string, passwordHash: string): Promise<void>;
    updateEmailVerification(id: string, isVerified: boolean): Promise<void>;
    findByIds(ids: string[]): Promise<BaseUser[]>;
    countUsers(): Promise<number>;
    findActiveUsers(limit?: number): Promise<BaseUser[]>;
    findUsersByRole(role: string): Promise<BaseUser[]>;
    searchUsers(query: string, limit?: number): Promise<BaseUser[]>;
}
export interface ISessionRepository extends BaseRepository {
    create(sessionData: Partial<AuthSession>): Promise<AuthSession>;
    findByToken(sessionToken: string): Promise<AuthSession | null>;
    findByUserId(userId: string): Promise<AuthSession[]>;
    update(sessionToken: string, sessionData: Partial<AuthSession>): Promise<AuthSession>;
    delete(sessionToken: string): Promise<boolean>;
    invalidateSession(sessionToken: string): Promise<void>;
    invalidateAllUserSessions(userId: string): Promise<void>;
    cleanupExpiredSessions(): Promise<number>;
    extendSession(sessionToken: string, expiresAt: Date): Promise<void>;
    getActiveSessions(): Promise<AuthSession[]>;
    getUserSessionCount(userId: string): Promise<number>;
    getSessionStats(): Promise<{
        total: number;
        active: number;
        expired: number;
    }>;
    findUserBySessionToken(sessionToken: string): Promise<BaseUser | null>;
}
export interface IRememberMeRepository extends BaseRepository {
    create(tokenData: Partial<RememberMeToken>): Promise<RememberMeToken>;
    findByTokenHash(tokenHash: string): Promise<RememberMeToken | null>;
    findBySeries(series: string): Promise<RememberMeToken | null>;
    findByUserId(userId: string): Promise<RememberMeToken[]>;
    update(tokenHash: string, tokenData: Partial<RememberMeToken>): Promise<RememberMeToken>;
    delete(tokenHash: string): Promise<boolean>;
    invalidateToken(tokenHash: string): Promise<void>;
    invalidateAllUserTokens(userId: string): Promise<void>;
    cleanupExpiredTokens(): Promise<number>;
    updateLastUsed(tokenHash: string): Promise<void>;
    rotateToken(oldTokenHash: string, newTokenData: Partial<RememberMeToken>): Promise<RememberMeToken>;
    getUserTokenCount(userId: string): Promise<number>;
    cleanupExcessTokens(userId: string, maxTokens: number): Promise<number>;
}
export interface IRateLimitRepository extends BaseRepository {
    getAttemptCount(key: string, windowMs: number): Promise<number>;
    incrementAttempts(key: string, windowMs: number): Promise<number>;
    resetAttempts(key: string): Promise<void>;
    getIPAttempts(ipAddress: string, action: string, windowMs: number): Promise<number>;
    incrementIPAttempts(ipAddress: string, action: string, windowMs: number): Promise<number>;
    getUserAttempts(userId: string, action: string, windowMs: number): Promise<number>;
    incrementUserAttempts(userId: string, action: string, windowMs: number): Promise<number>;
    isBlocked(key: string): Promise<boolean>;
    blockKey(key: string, durationMs: number): Promise<void>;
    unblockKey(key: string): Promise<void>;
    cleanupExpiredEntries(): Promise<number>;
}
export interface IAuditRepository extends BaseRepository {
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
    getFailedLoginAttempts(timeframe: number): Promise<number>;
    getSuspiciousActivity(timeframe: number): Promise<any[]>;
}
export interface IAuthRepositories {
    user: IUserRepository;
    session: ISessionRepository;
    rememberMe: IRememberMeRepository;
    rateLimit: IRateLimitRepository;
    audit: IAuditRepository;
    withTransaction<T>(callback: (repos: IAuthRepositories) => Promise<T>): Promise<T>;
    performMaintenance(): Promise<{
        expiredSessions: number;
        expiredTokens: number;
        expiredRateLimits: number;
    }>;
}
export interface IRepositoryFactory {
    createUserRepository(context: DatabaseContext): IUserRepository;
    createSessionRepository(context: DatabaseContext): ISessionRepository;
    createRememberMeRepository(context: DatabaseContext): IRememberMeRepository;
    createRateLimitRepository(context: DatabaseContext): IRateLimitRepository;
    createAuditRepository(context: DatabaseContext): IAuditRepository;
    createAuthRepositories(context: DatabaseContext): IAuthRepositories;
}
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
export declare abstract class AbstractRepository implements BaseRepository {
    protected config: RepositoryConfig;
    constructor(config: RepositoryConfig);
    abstract getContext(): DatabaseContext;
    abstract close(): Promise<void>;
    abstract beginTransaction(): Promise<any>;
    abstract commitTransaction(transaction: any): Promise<void>;
    abstract rollbackTransaction(transaction: any): Promise<void>;
    protected generateId(): string;
    protected validateRequiredFields(data: any, fields: string[]): void;
    protected sanitizeData(data: any): any;
}
export declare class RepositoryError extends Error {
    operation: string;
    originalError?: Error | undefined;
    constructor(message: string, operation: string, originalError?: Error | undefined);
}
export declare class NotFoundError extends RepositoryError {
    constructor(resource: string, identifier: string);
}
export declare class ConflictError extends RepositoryError {
    constructor(resource: string, field: string, value: string);
}
export declare class ValidationError extends RepositoryError {
    constructor(field: string, value: any, requirement: string);
}
//# sourceMappingURL=index.d.ts.map