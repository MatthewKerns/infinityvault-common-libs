"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RememberMeService = void 0;
const types_1 = require("../types");
const security_1 = require("../security");
/**
 * Remember me token service with automatic rotation and security monitoring
 */
class RememberMeService {
    constructor(rememberMeRepo, userRepo, config, auditRepo) {
        this.rememberMeRepo = rememberMeRepo;
        this.userRepo = userRepo;
        this.config = config;
        this.auditRepo = auditRepo;
    }
    /**
     * Create a new remember me token for a user
     */
    async createToken(userId, context) {
        try {
            if (!this.config.rememberMe.enabled) {
                throw new types_1.AuthError('Remember me functionality is disabled', 'REMEMBER_ME_DISABLED');
            }
            // Validate user exists
            const user = await this.userRepo.findById(userId);
            if (!user) {
                throw new types_1.AuthError('User not found', 'USER_NOT_FOUND', 404);
            }
            // Clean up excess tokens for this user
            const currentTokenCount = await this.rememberMeRepo.getUserTokenCount(userId);
            if (currentTokenCount >= this.config.rememberMe.maxTokensPerUser) {
                await this.rememberMeRepo.cleanupExcessTokens(userId, this.config.rememberMe.maxTokensPerUser - 1);
            }
            // Generate secure token
            const { token, hash, series } = security_1.SessionSecurity.generateRememberMeToken();
            // Set expiration
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + this.config.session.rememberMeExpiryDays);
            // Store token in database
            await this.rememberMeRepo.create({
                userId,
                tokenHash: hash,
                series,
                expiresAt,
                ipAddress: context.ipAddress,
                userAgent: context.userAgent,
                isActive: true,
                createdAt: new Date(),
                lastUsedAt: new Date()
            });
            // Log token creation
            if (this.auditRepo) {
                await this.auditRepo.logAuthEvent({
                    userId,
                    action: 'REMEMBER_ME_TOKEN_CREATED',
                    ipAddress: context.ipAddress,
                    userAgent: context.userAgent,
                    success: true,
                    metadata: {
                        series,
                        expiresAt: expiresAt.toISOString(),
                        requestId: context.requestId
                    }
                });
            }
            return {
                token,
                series,
                expiresAt
            };
        }
        catch (error) {
            // Log token creation failure
            if (this.auditRepo) {
                await this.auditRepo.logAuthEvent({
                    userId,
                    action: 'REMEMBER_ME_TOKEN_CREATION_FAILED',
                    ipAddress: context.ipAddress,
                    userAgent: context.userAgent,
                    success: false,
                    metadata: {
                        error: error instanceof Error ? error.message : 'Unknown error',
                        requestId: context.requestId
                    }
                });
            }
            if (error instanceof types_1.AuthError) {
                throw error;
            }
            throw new types_1.AuthError('Failed to create remember me token', 'TOKEN_CREATION_FAILED');
        }
    }
    /**
     * Validate and use a remember me token
     */
    async validateToken(token, context) {
        try {
            if (!this.config.rememberMe.enabled) {
                return {
                    isValid: false,
                    error: 'Remember me functionality is disabled'
                };
            }
            // Generate hash for token lookup
            const tokenHash = security_1.SessionSecurity.generateRememberMeToken().hash;
            // Find token by hash
            const dbToken = await this.rememberMeRepo.findByTokenHash(tokenHash);
            if (!dbToken) {
                // Log potential token theft attempt
                if (this.auditRepo) {
                    await this.auditRepo.logSecurityEvent({
                        eventType: 'INVALID_REMEMBER_ME_TOKEN',
                        severity: 'medium',
                        description: 'Attempt to use invalid remember me token',
                        ipAddress: context.ipAddress,
                        userAgent: context.userAgent,
                        metadata: {
                            requestId: context.requestId
                        }
                    });
                }
                return {
                    isValid: false,
                    error: 'Invalid remember me token'
                };
            }
            // Check if token is active
            if (!dbToken.isActive) {
                return {
                    isValid: false,
                    error: 'Remember me token is inactive'
                };
            }
            // Check expiration
            if (dbToken.expiresAt < new Date()) {
                await this.rememberMeRepo.invalidateToken(dbToken.tokenHash);
                return {
                    isValid: false,
                    error: 'Remember me token expired'
                };
            }
            // Verify token
            if (!security_1.SessionSecurity.verifyRememberMeToken(token, dbToken.tokenHash)) {
                // This could indicate a token theft attempt
                await this.handleSuspiciousActivity(dbToken, context);
                return {
                    isValid: false,
                    error: 'Invalid remember me token'
                };
            }
            // Get user
            const user = await this.userRepo.findById(dbToken.userId);
            if (!user) {
                await this.rememberMeRepo.invalidateToken(dbToken.tokenHash);
                return {
                    isValid: false,
                    error: 'User not found'
                };
            }
            // IP validation (optional security check)
            if (dbToken.ipAddress && context.ipAddress && dbToken.ipAddress !== context.ipAddress) {
                // Log IP change but don't invalidate (could be legitimate)
                if (this.auditRepo) {
                    await this.auditRepo.logSecurityEvent({
                        userId: dbToken.userId,
                        eventType: 'REMEMBER_ME_IP_CHANGE',
                        severity: 'medium',
                        description: 'Remember me token used from different IP',
                        ipAddress: context.ipAddress,
                        metadata: {
                            originalIP: dbToken.ipAddress,
                            newIP: context.ipAddress,
                            series: dbToken.series,
                            requestId: context.requestId
                        }
                    });
                }
            }
            // Token rotation if enabled
            let newToken;
            if (this.config.rememberMe.rotateOnUse) {
                const rotationResult = await this.rotateToken(dbToken, context);
                newToken = rotationResult.newToken;
            }
            else {
                // Update last used timestamp
                await this.rememberMeRepo.updateLastUsed(dbToken.tokenHash);
            }
            // Log successful token usage
            if (this.auditRepo) {
                await this.auditRepo.logAuthEvent({
                    userId: dbToken.userId,
                    action: 'REMEMBER_ME_TOKEN_USED',
                    ipAddress: context.ipAddress,
                    userAgent: context.userAgent,
                    success: true,
                    metadata: {
                        series: dbToken.series,
                        rotated: this.config.rememberMe.rotateOnUse,
                        requestId: context.requestId
                    }
                });
            }
            return {
                isValid: true,
                user,
                newToken,
                series: dbToken.series
            };
        }
        catch (error) {
            console.error('Remember me token validation error:', error);
            return {
                isValid: false,
                error: error instanceof Error ? error.message : 'Token validation failed'
            };
        }
    }
    /**
     * Rotate a remember me token
     */
    async rotateToken(currentToken, context) {
        try {
            // Generate new token with same series
            const { token: newTokenValue, hash: newTokenHash } = security_1.SessionSecurity.generateRememberMeToken();
            // Create new expiration date
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + this.config.session.rememberMeExpiryDays);
            // Rotate token atomically
            const newToken = await this.rememberMeRepo.rotateToken(currentToken.tokenHash, {
                tokenHash: newTokenHash,
                series: currentToken.series, // Keep same series
                expiresAt,
                ipAddress: context.ipAddress,
                userAgent: context.userAgent,
                lastUsedAt: new Date(),
                updatedAt: new Date()
            });
            // Log token rotation
            if (this.auditRepo) {
                await this.auditRepo.logAuthEvent({
                    userId: currentToken.userId,
                    action: 'REMEMBER_ME_TOKEN_ROTATED',
                    ipAddress: context.ipAddress,
                    userAgent: context.userAgent,
                    success: true,
                    metadata: {
                        series: currentToken.series,
                        newExpiresAt: expiresAt.toISOString(),
                        requestId: context.requestId
                    }
                });
            }
            return {
                newToken: newTokenValue,
                series: newToken.series
            };
        }
        catch (error) {
            console.error('Token rotation error:', error);
            throw new types_1.AuthError('Failed to rotate remember me token', 'TOKEN_ROTATION_FAILED');
        }
    }
    /**
     * Invalidate a remember me token
     */
    async invalidateToken(tokenOrSeries, isSeriesLookup = false, context) {
        try {
            let token;
            if (isSeriesLookup) {
                token = await this.rememberMeRepo.findBySeries(tokenOrSeries);
            }
            else {
                const tokenHash = security_1.SessionSecurity.generateRememberMeToken().hash;
                token = await this.rememberMeRepo.findByTokenHash(tokenHash);
            }
            if (token) {
                await this.rememberMeRepo.invalidateToken(token.tokenHash);
                // Log token invalidation
                if (this.auditRepo) {
                    await this.auditRepo.logAuthEvent({
                        userId: token.userId,
                        action: 'REMEMBER_ME_TOKEN_INVALIDATED',
                        ipAddress: context.ipAddress,
                        userAgent: context.userAgent,
                        success: true,
                        metadata: {
                            series: token.series,
                            reason: context.reason || 'manual_invalidation',
                            lookupMethod: isSeriesLookup ? 'series' : 'token',
                            requestId: context.requestId
                        }
                    });
                }
            }
        }
        catch (error) {
            console.error('Token invalidation error:', error);
            // Don't throw on invalidation errors - it's a cleanup operation
        }
    }
    /**
     * Invalidate all remember me tokens for a user
     */
    async invalidateAllUserTokens(userId, context) {
        try {
            // Get current token count for logging
            const tokenCount = await this.rememberMeRepo.getUserTokenCount(userId);
            // Invalidate all tokens
            await this.rememberMeRepo.invalidateAllUserTokens(userId);
            // Log bulk invalidation
            if (this.auditRepo) {
                await this.auditRepo.logSecurityEvent({
                    userId,
                    eventType: 'BULK_REMEMBER_ME_INVALIDATION',
                    severity: 'medium',
                    description: `Invalidated ${tokenCount} remember me tokens for user`,
                    ipAddress: context.ipAddress,
                    userAgent: context.userAgent,
                    metadata: {
                        reason: context.reason || 'bulk_invalidation',
                        invalidatedCount: tokenCount,
                        requestId: context.requestId
                    }
                });
            }
            return { invalidatedCount: tokenCount };
        }
        catch (error) {
            console.error('Bulk token invalidation error:', error);
            return { invalidatedCount: 0 };
        }
    }
    /**
     * Get active remember me tokens for a user
     */
    async getUserActiveTokens(userId) {
        try {
            const tokens = await this.rememberMeRepo.findByUserId(userId);
            const now = new Date();
            const activeTokens = tokens.filter(token => token.isActive && token.expiresAt > now);
            // Remove sensitive hash from response
            const safeTokens = activeTokens.map(({ tokenHash, ...token }) => token);
            return {
                tokens: safeTokens,
                count: activeTokens.length
            };
        }
        catch (error) {
            console.error('Get user tokens error:', error);
            return {
                tokens: [],
                count: 0
            };
        }
    }
    /**
     * Clean up expired remember me tokens
     */
    async cleanupExpiredTokens() {
        try {
            const cleanedCount = await this.rememberMeRepo.cleanupExpiredTokens();
            console.log(`🧽 Cleaned up ${cleanedCount} expired remember me tokens`);
            return { cleanedCount };
        }
        catch (error) {
            console.error('Token cleanup error:', error);
            return { cleanedCount: 0 };
        }
    }
    /**
     * Handle suspicious remember me activity
     */
    async handleSuspiciousActivity(token, context) {
        try {
            // Invalidate all tokens in the same series (potential compromise)
            const seriesTokens = await this.rememberMeRepo.findBySeries(token.series);
            if (seriesTokens) {
                await this.rememberMeRepo.invalidateToken(seriesTokens.tokenHash);
            }
            // Log security incident
            if (this.auditRepo) {
                await this.auditRepo.logSecurityEvent({
                    userId: token.userId,
                    eventType: 'REMEMBER_ME_TOKEN_THEFT_SUSPECTED',
                    severity: 'high',
                    description: 'Potential remember me token theft detected',
                    ipAddress: context.ipAddress,
                    userAgent: context.userAgent,
                    metadata: {
                        series: token.series,
                        originalIP: token.ipAddress,
                        suspiciousIP: context.ipAddress,
                        tokenAge: Date.now() - token.createdAt.getTime(),
                        requestId: context.requestId
                    }
                });
            }
        }
        catch (error) {
            console.error('Error handling suspicious activity:', error);
        }
    }
    /**
     * Get remember me token statistics
     */
    async getTokenStats() {
        try {
            // This would typically aggregate data from the repository
            // For now, return placeholder values
            return {
                totalTokens: 0,
                activeTokens: 0,
                expiredTokens: 0,
                tokensPerUser: {
                    average: 0,
                    max: 0
                }
            };
        }
        catch (error) {
            console.error('Token stats error:', error);
            return {
                totalTokens: 0,
                activeTokens: 0,
                expiredTokens: 0,
                tokensPerUser: {
                    average: 0,
                    max: 0
                }
            };
        }
    }
    /**
     * Monitor for token abuse patterns
     */
    async detectTokenAbuse(timeframe = 24 * 60 * 60 * 1000 // 24 hours
    ) {
        try {
            // This would analyze audit logs for suspicious patterns
            // For now, return empty results as a placeholder
            return {
                suspiciousPatterns: []
            };
        }
        catch (error) {
            console.error('Token abuse detection error:', error);
            return {
                suspiciousPatterns: []
            };
        }
    }
}
exports.RememberMeService = RememberMeService;
//# sourceMappingURL=RememberMeService.js.map