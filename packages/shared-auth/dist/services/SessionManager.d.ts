import { AuthSession, SessionValidationResult, SessionOptions, SecurityConfig, BaseUser } from '../types';
import { ISessionRepository, IUserRepository, IAuditRepository } from '../repositories';
/**
 * Session management service with enhanced security and monitoring
 */
export declare class SessionManager {
    private sessionRepo;
    private userRepo;
    private auditRepo?;
    private config;
    constructor(sessionRepo: ISessionRepository, userRepo: IUserRepository, config: SecurityConfig, auditRepo?: IAuditRepository);
    /**
     * Create a new session for a user
     */
    createSession(userId: string, options: SessionOptions | undefined, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
    }): Promise<{
        success: boolean;
        sessionToken?: string;
        session?: AuthSession;
        error?: string;
    }>;
    /**
     * Validate an existing session
     */
    validateSession(sessionToken: string, context?: {
        ipAddress?: string;
        userAgent?: string;
        updateActivity?: boolean;
    }): Promise<SessionValidationResult>;
    /**
     * Extend an existing session
     */
    extendSession(sessionToken: string, additionalDays: number | undefined, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
    }): Promise<{
        success: boolean;
        newExpiresAt?: Date;
        error?: string;
    }>;
    /**
     * Revoke a session
     */
    revokeSession(sessionToken: string, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
        reason?: string;
    }): Promise<void>;
    /**
     * Revoke all sessions for a user
     */
    revokeAllUserSessions(userId: string, excludeSessionToken?: string, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
        reason?: string;
    }): Promise<{
        revokedCount: number;
    }>;
    /**
     * Get user by session token
     */
    getUserBySessionToken(sessionToken: string): Promise<BaseUser | null>;
    /**
     * Get active sessions for a user
     */
    getUserActiveSessions(userId: string): Promise<AuthSession[]>;
    /**
     * Clean up expired sessions
     */
    cleanupExpiredSessions(): Promise<{
        cleanedCount: number;
    }>;
    /**
     * Get session statistics
     */
    getSessionStats(): Promise<{
        total: number;
        active: number;
        expired: number;
        averageSessionDuration: number;
    }>;
    /**
     * Detect suspicious session activity
     */
    detectSuspiciousActivity(timeframe?: number): Promise<{
        suspiciousEvents: any[];
        metrics: {
            multipleIPSessions: number;
            rapidSessionCreation: number;
            unusualSessionDuration: number;
        };
    }>;
}
export { SessionManager };
//# sourceMappingURL=SessionManager.d.ts.map