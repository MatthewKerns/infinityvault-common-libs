"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = void 0;
const types_1 = require("../types");
const security_1 = require("../security");
/**
 * Session management service with enhanced security and monitoring
 */
class SessionManager {
    constructor(sessionRepo, userRepo, config, auditRepo) {
        this.sessionRepo = sessionRepo;
        this.userRepo = userRepo;
        this.config = config;
        this.auditRepo = auditRepo;
    }
    /**
     * Create a new session for a user
     */
    async createSession(userId, options = {}, context) {
        try {
            // Validate user exists
            const user = await this.userRepo.findById(userId);
            if (!user) {
                throw new types_1.SessionError('User not found', 'USER_NOT_FOUND', 404);
            }
            // Check existing session limit per user
            const existingSessions = await this.sessionRepo.findByUserId(userId);
            const activeSessions = existingSessions.filter(s => s.isActive && s.expiresAt > new Date());
            // Limit concurrent sessions (configurable)
            const maxSessionsPerUser = 5; // Could be made configurable
            if (activeSessions.length >= maxSessionsPerUser) {
                // Remove oldest session
                const oldestSession = activeSessions.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0];
                await this.sessionRepo.invalidateSession(oldestSession.sessionToken);
            }
            // Generate secure session token
            const sessionToken = security_1.SessionSecurity.generateSessionToken();
            // Calculate expiration
            const expiresAt = new Date();
            const daysToAdd = options.rememberMe
                ? this.config.session.rememberMeExpiryDays
                : this.config.session.defaultExpiryDays;
            expiresAt.setDate(expiresAt.getDate() + daysToAdd);
            // Create session
            const session = await this.sessionRepo.create({
                userId,
                sessionToken,
                expiresAt,
                ipAddress: context.ipAddress,
                userAgent: context.userAgent,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            // Log session creation
            if (this.auditRepo) {
                await this.auditRepo.logAuthEvent({
                    userId,
                    action: 'SESSION_CREATED',
                    ipAddress: context.ipAddress,
                    userAgent: context.userAgent,
                    success: true,
                    metadata: {
                        sessionDuration: daysToAdd,
                        rememberMe: options.rememberMe,
                        isGoogleAuth: options.isGoogleAuth,
                        requestId: context.requestId
                    }
                });
            }
            return {
                success: true,
                sessionToken,
                session
            };
        }
        catch (error) {
            // Log session creation failure
            if (this.auditRepo) {
                await this.auditRepo.logAuthEvent({
                    userId,
                    action: 'SESSION_CREATION_FAILED',
                    ipAddress: context.ipAddress,
                    userAgent: context.userAgent,
                    success: false,
                    metadata: {
                        error: error instanceof Error ? error.message : 'Unknown error',
                        requestId: context.requestId
                    }
                });
            }
            if (error instanceof types_1.SessionError) {
                throw error;
            }
            return {
                success: false,
                error: 'Failed to create session'
            };
        }
    }
    /**
     * Validate an existing session
     */
    async validateSession(sessionToken, context = {}) {
        try {
            // Basic token validation
            if (!sessionToken || sessionToken.length < 32) {
                return {
                    isValid: false,
                    error: 'Invalid session token format'
                };
            }
            // Find session
            const session = await this.sessionRepo.findByToken(sessionToken);
            if (!session) {
                return {
                    isValid: false,
                    error: 'Session not found'
                };
            }
            // Check if session is active
            if (!session.isActive) {
                return {
                    isValid: false,
                    error: 'Session is inactive'
                };
            }
            // Check expiration
            const now = new Date();
            if (session.expiresAt < now) {
                // Auto-cleanup expired session
                await this.sessionRepo.invalidateSession(sessionToken);
                return {
                    isValid: false,
                    error: 'Session expired'
                };
            }
            // Validate session timing for suspicious activity
            const timingValidation = security_1.SessionSecurity.validateSessionTiming(session.updatedAt, now, 30 * 60 * 1000 // 30 minutes max idle time
            );
            if (!timingValidation.isValid) {
                await this.sessionRepo.invalidateSession(sessionToken);
                // Log suspicious activity
                if (this.auditRepo) {
                    await this.auditRepo.logSecurityEvent({
                        userId: session.userId,
                        eventType: 'SESSION_TIMEOUT',
                        severity: 'low',
                        description: 'Session invalidated due to inactivity',
                        ipAddress: context.ipAddress,
                        metadata: {
                            sessionToken: sessionToken.substring(0, 8) + '...',
                            lastActivity: session.updatedAt,
                            maxIdleTime: '30 minutes'
                        }
                    });
                }
                return {
                    isValid: false,
                    error: 'Session timed out due to inactivity'
                };
            }
            // IP address validation (optional security check)
            if (session.ipAddress && context.ipAddress && session.ipAddress !== context.ipAddress) {
                // Log IP change but don't invalidate (could be legitimate)
                if (this.auditRepo) {
                    await this.auditRepo.logSecurityEvent({
                        userId: session.userId,
                        eventType: 'SESSION_IP_CHANGE',
                        severity: 'medium',
                        description: 'Session accessed from different IP address',
                        ipAddress: context.ipAddress,
                        metadata: {
                            originalIP: session.ipAddress,
                            newIP: context.ipAddress,
                            sessionToken: sessionToken.substring(0, 8) + '...'
                        }
                    });
                }
            }
            // Update session activity if requested
            if (context.updateActivity && timingValidation.shouldRefresh) {
                await this.sessionRepo.update(sessionToken, {
                    updatedAt: now,
                    ipAddress: context.ipAddress // Update IP if provided
                });
            }
            // Calculate time until expiration
            const timeUntilExpiry = session.expiresAt.getTime() - now.getTime();
            return {
                isValid: true,
                userId: session.userId,
                expiresAt: session.expiresAt,
                shouldRefresh: timingValidation.shouldRefresh,
                timeRemaining: Math.max(0, timeUntilExpiry)
            };
        }
        catch (error) {
            console.error('Session validation error:', error);
            return {
                isValid: false,
                error: error instanceof Error ? error.message : 'Session validation failed'
            };
        }
    }
    /**
     * Extend an existing session
     */
    async extendSession(sessionToken, additionalDays = 0, context) {
        try {
            // Validate session first
            const validation = await this.validateSession(sessionToken, context);
            if (!validation.isValid) {
                return {
                    success: false,
                    error: validation.error || 'Invalid session'
                };
            }
            // Calculate new expiration
            const currentSession = await this.sessionRepo.findByToken(sessionToken);
            if (!currentSession) {
                return {
                    success: false,
                    error: 'Session not found'
                };
            }
            const newExpiresAt = new Date(currentSession.expiresAt);
            newExpiresAt.setDate(newExpiresAt.getDate() + (additionalDays || this.config.session.defaultExpiryDays));
            // Update session
            await this.sessionRepo.extendSession(sessionToken, newExpiresAt);
            // Log session extension
            if (this.auditRepo && validation.userId) {
                await this.auditRepo.logAuthEvent({
                    userId: validation.userId,
                    action: 'SESSION_EXTENDED',
                    ipAddress: context.ipAddress,
                    userAgent: context.userAgent,
                    success: true,
                    metadata: {
                        additionalDays,
                        newExpiresAt: newExpiresAt.toISOString(),
                        requestId: context.requestId
                    }
                });
            }
            return {
                success: true,
                newExpiresAt
            };
        }
        catch (error) {
            console.error('Session extension error:', error);
            return {
                success: false,
                error: 'Failed to extend session'
            };
        }
    }
    /**
     * Revoke a session
     */
    async revokeSession(sessionToken, context) {
        try {
            // Get session info before revoking for logging
            const session = await this.sessionRepo.findByToken(sessionToken);
            // Revoke session
            await this.sessionRepo.invalidateSession(sessionToken);
            // Log session revocation
            if (this.auditRepo && session) {
                await this.auditRepo.logAuthEvent({
                    userId: session.userId,
                    action: 'SESSION_REVOKED',
                    ipAddress: context.ipAddress,
                    userAgent: context.userAgent,
                    success: true,
                    metadata: {
                        reason: context.reason || 'manual_revocation',
                        sessionAge: Date.now() - session.createdAt.getTime(),
                        requestId: context.requestId
                    }
                });
            }
        }
        catch (error) {
            console.error('Session revocation error:', error);
            // Don't throw on revocation errors - it's a cleanup operation
        }
    }
    /**
     * Revoke all sessions for a user
     */
    async revokeAllUserSessions(userId, excludeSessionToken, context) {
        try {
            // Get all user sessions
            const sessions = await this.sessionRepo.findByUserId(userId);
            const activeSessions = sessions.filter(s => s.isActive &&
                s.expiresAt > new Date() &&
                s.sessionToken !== excludeSessionToken);
            // Revoke each session
            for (const session of activeSessions) {
                await this.sessionRepo.invalidateSession(session.sessionToken);
            }
            // Bulk revoke remaining sessions
            await this.sessionRepo.invalidateAllUserSessions(userId);
            // Log bulk revocation
            if (this.auditRepo) {
                await this.auditRepo.logSecurityEvent({
                    userId,
                    eventType: 'BULK_SESSION_REVOCATION',
                    severity: 'medium',
                    description: `Revoked ${activeSessions.length} sessions for user`,
                    ipAddress: context.ipAddress,
                    userAgent: context.userAgent,
                    metadata: {
                        reason: context.reason || 'bulk_revocation',
                        revokedCount: activeSessions.length,
                        excludedSession: excludeSessionToken ? excludeSessionToken.substring(0, 8) + '...' : undefined,
                        requestId: context.requestId
                    }
                });
            }
            return {
                revokedCount: activeSessions.length
            };
        }
        catch (error) {
            console.error('Bulk session revocation error:', error);
            return {
                revokedCount: 0
            };
        }
    }
    /**
     * Get user by session token
     */
    async getUserBySessionToken(sessionToken) {
        try {
            // Validate session first
            const validation = await this.validateSession(sessionToken, { updateActivity: true });
            if (!validation.isValid || !validation.userId) {
                return null;
            }
            // Get user
            return await this.userRepo.findById(validation.userId);
        }
        catch (error) {
            console.error('Get user by session error:', error);
            return null;
        }
    }
    /**
     * Get active sessions for a user
     */
    async getUserActiveSessions(userId) {
        try {
            const sessions = await this.sessionRepo.findByUserId(userId);
            const now = new Date();
            return sessions.filter(session => session.isActive && session.expiresAt > now);
        }
        catch (error) {
            console.error('Get user sessions error:', error);
            return [];
        }
    }
    /**
     * Clean up expired sessions
     */
    async cleanupExpiredSessions() {
        try {
            const cleanedCount = await this.sessionRepo.cleanupExpiredSessions();
            console.log(`🧽 Cleaned up ${cleanedCount} expired sessions`);
            return { cleanedCount };
        }
        catch (error) {
            console.error('Session cleanup error:', error);
            return { cleanedCount: 0 };
        }
    }
    /**
     * Get session statistics
     */
    async getSessionStats() {
        try {
            const stats = await this.sessionRepo.getSessionStats();
            // Calculate average session duration (placeholder - would need session duration tracking)
            const averageSessionDuration = 24 * 60 * 60 * 1000; // 24 hours in ms
            return {
                ...stats,
                averageSessionDuration
            };
        }
        catch (error) {
            console.error('Session stats error:', error);
            return {
                total: 0,
                active: 0,
                expired: 0,
                averageSessionDuration: 0
            };
        }
    }
    /**
     * Detect suspicious session activity
     */
    async detectSuspiciousActivity(timeframe = 24 * 60 * 60 * 1000 // 24 hours
    ) {
        try {
            const suspiciousEvents = [];
            // This would typically query the audit repository for suspicious patterns
            // For now, return empty results as a placeholder
            return {
                suspiciousEvents,
                metrics: {
                    multipleIPSessions: 0,
                    rapidSessionCreation: 0,
                    unusualSessionDuration: 0
                }
            };
        }
        catch (error) {
            console.error('Suspicious activity detection error:', error);
            return {
                suspiciousEvents: [],
                metrics: {
                    multipleIPSessions: 0,
                    rapidSessionCreation: 0,
                    unusualSessionDuration: 0
                }
            };
        }
    }
}
exports.SessionManager = SessionManager;
//# sourceMappingURL=SessionManager.js.map