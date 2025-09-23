"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCore = void 0;
const types_1 = require("../types");
const security_1 = require("../security");
/**
 * Core authentication service with dependency injection
 * Provides consistent authentication behavior across website and EOS systems
 */
class AuthCore {
    constructor(repositories, securityValidator, config) {
        this.repositories = repositories;
        this.securityValidator = securityValidator;
        this.config = config;
    }
    /**
     * Register a new user with email and password
     */
    async register(request, context) {
        try {
            // Security validation
            await this.securityValidator.validateAuthRequest({
                email: request.email,
                password: request.password
            }, context);
            // Check if user already exists
            const existingUser = await this.repositories.user.findByEmail(request.email);
            if (existingUser) {
                throw new types_1.AuthError('User already exists with this email', 'USER_EXISTS', 409);
            }
            // Hash password
            const passwordHash = await security_1.PasswordSecurity.hashPassword(request.password);
            // Create user within transaction
            const result = await this.repositories.withTransaction(async (repos) => {
                // Create user
                const user = await repos.user.create({
                    email: request.email,
                    firstName: request.firstName,
                    lastName: request.lastName,
                    birthday: request.birthday ? new Date(request.birthday) : undefined,
                    passwordHash,
                    marketingConsent: request.marketingConsent,
                    authProvider: 'manual',
                    isVerified: false, // Require email verification
                    role: 'customer',
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                // Log registration event
                if (repos.audit) {
                    await repos.audit.logAuthEvent({
                        userId: user.id,
                        action: 'REGISTER',
                        ipAddress: context.ipAddress,
                        userAgent: context.userAgent,
                        success: true,
                        metadata: {
                            authProvider: 'manual',
                            marketingConsent: request.marketingConsent,
                            requestId: context.requestId
                        }
                    });
                }
                return user;
            });
            // Reset rate limits after successful registration
            if (context.ipAddress) {
                await this.securityValidator.resetRateLimit(`ip:${context.ipAddress}:auth_attempt`);
            }
            await this.securityValidator.resetRateLimit(`user:${request.email}:auth_attempt`);
            return {
                success: true,
                user: result,
                requiresVerification: true
            };
        }
        catch (error) {
            // Log failed registration
            if (this.repositories.audit) {
                await this.repositories.audit.logAuthEvent({
                    action: 'REGISTER_FAILED',
                    ipAddress: context.ipAddress,
                    userAgent: context.userAgent,
                    success: false,
                    metadata: {
                        email: request.email,
                        error: error instanceof Error ? error.message : 'Unknown error',
                        requestId: context.requestId
                    }
                });
            }
            if (error instanceof types_1.AuthError || error instanceof types_1.SecurityError) {
                throw error;
            }
            throw new types_1.AuthError('Registration failed', 'REGISTRATION_FAILED', 500);
        }
    }
    /**
     * Login user with email and password
     */
    async login(request, context) {
        try {
            // Security validation
            await this.securityValidator.validateAuthRequest(request, context);
            // Find user
            const user = await this.repositories.user.findByEmail(request.email);
            if (!user || !user.passwordHash) {
                throw new types_1.AuthError('Invalid email or password', 'INVALID_CREDENTIALS', 401);
            }
            // Verify password
            const isPasswordValid = await security_1.PasswordSecurity.comparePassword(request.password, user.passwordHash);
            if (!isPasswordValid) {
                throw new types_1.AuthError('Invalid email or password', 'INVALID_CREDENTIALS', 401);
            }
            // Check if email is verified
            if (!user.isVerified) {
                throw new types_1.AuthError('Please verify your email before logging in', 'EMAIL_NOT_VERIFIED', 403);
            }
            // Create session and optionally remember me token
            const result = await this.repositories.withTransaction(async (repos) => {
                // Create session
                const session = await this.createSession(user.id, {
                    rememberMe: request.rememberMe,
                    isGoogleAuth: false
                }, context);
                // Update last login
                await repos.user.updateLastLogin(user.id);
                // Create remember me token if requested
                let rememberMeTokenValue;
                if (request.rememberMe && this.config.rememberMe.enabled) {
                    const rememberMeToken = await this.createRememberMeToken(user.id, context);
                    rememberMeTokenValue = rememberMeToken.token;
                }
                // Log successful login
                if (repos.audit) {
                    await repos.audit.logAuthEvent({
                        userId: user.id,
                        action: 'LOGIN',
                        ipAddress: context.ipAddress,
                        userAgent: context.userAgent,
                        success: true,
                        metadata: {
                            authProvider: 'manual',
                            rememberMe: request.rememberMe,
                            requestId: context.requestId
                        }
                    });
                }
                return { session, rememberMeTokenValue };
            });
            // Reset rate limits after successful login
            if (context.ipAddress) {
                await this.securityValidator.resetRateLimit(`ip:${context.ipAddress}:auth_attempt`);
            }
            await this.securityValidator.resetRateLimit(`user:${request.email}:auth_attempt`);
            return {
                success: true,
                user,
                session: result.session,
                rememberMeToken: result.rememberMeTokenValue
            };
        }
        catch (error) {
            // Log failed login attempt
            if (this.repositories.audit) {
                await this.repositories.audit.logAuthEvent({
                    action: 'LOGIN_FAILED',
                    ipAddress: context.ipAddress,
                    userAgent: context.userAgent,
                    success: false,
                    metadata: {
                        email: request.email,
                        error: error instanceof Error ? error.message : 'Unknown error',
                        requestId: context.requestId
                    }
                });
            }
            if (error instanceof types_1.AuthError || error instanceof types_1.SecurityError) {
                throw error;
            }
            throw new types_1.AuthError('Login failed', 'LOGIN_FAILED', 500);
        }
    }
    /**
     * Validate an existing session
     */
    async validateSession(sessionToken, context) {
        try {
            // Security validation
            await this.securityValidator.validateSessionRequest(sessionToken, context);
            // Find session
            const session = await this.repositories.session.findByToken(sessionToken);
            if (!session || !session.isActive) {
                return {
                    isValid: false,
                    error: 'Session not found'
                };
            }
            // Check if session is expired
            if (session.expiresAt < new Date()) {
                // Clean up expired session
                await this.repositories.session.invalidateSession(sessionToken);
                return {
                    isValid: false,
                    error: 'Session expired'
                };
            }
            // Check session timing for suspicious activity
            const timingValidation = security_1.SessionSecurity.validateSessionTiming(session.updatedAt, new Date(), 30 * 60 * 1000 // 30 minutes max idle time
            );
            if (!timingValidation.isValid) {
                await this.repositories.session.invalidateSession(sessionToken);
                return {
                    isValid: false,
                    error: 'Session timed out due to inactivity'
                };
            }
            // Update session activity
            if (timingValidation.shouldRefresh) {
                await this.repositories.session.update(sessionToken, {
                    updatedAt: new Date()
                });
            }
            return {
                isValid: true,
                userId: session.userId,
                expiresAt: session.expiresAt,
                shouldRefresh: timingValidation.shouldRefresh
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
     * Create a new session
     */
    async createSession(userId, options, context) {
        const sessionToken = security_1.SessionSecurity.generateSessionToken();
        const expiresAt = new Date();
        // Set expiration based on remember me option
        const daysToAdd = options.rememberMe
            ? this.config.session.rememberMeExpiryDays
            : this.config.session.defaultExpiryDays;
        expiresAt.setDate(expiresAt.getDate() + daysToAdd);
        return await this.repositories.session.create({
            userId,
            sessionToken,
            expiresAt,
            ipAddress: context.ipAddress,
            userAgent: context.userAgent,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
    /**
     * Create a remember me token
     */
    async createRememberMeToken(userId, context) {
        const { token, hash, series } = security_1.SessionSecurity.generateRememberMeToken();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + this.config.rememberMe.enabled ? this.config.session.rememberMeExpiryDays : 30);
        // Clean up excess tokens for user
        const currentTokenCount = await this.repositories.rememberMe.getUserTokenCount(userId);
        if (currentTokenCount >= this.config.rememberMe.maxTokensPerUser) {
            await this.repositories.rememberMe.cleanupExcessTokens(userId, this.config.rememberMe.maxTokensPerUser - 1);
        }
        const dbToken = await this.repositories.rememberMe.create({
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
        return { token, dbToken };
    }
    /**
     * Validate and use remember me token
     */
    async validateRememberMeToken(token, context) {
        try {
            const tokenHash = security_1.SessionSecurity.generateRememberMeToken().hash;
            // Find token by hash
            const dbToken = await this.repositories.rememberMe.findByTokenHash(tokenHash);
            if (!dbToken || !dbToken.isActive) {
                throw new types_1.AuthError('Invalid remember me token', 'INVALID_TOKEN', 401);
            }
            // Check if token is expired
            if (dbToken.expiresAt < new Date()) {
                await this.repositories.rememberMe.invalidateToken(tokenHash);
                throw new types_1.AuthError('Remember me token expired', 'TOKEN_EXPIRED', 401);
            }
            // Verify token
            if (!security_1.SessionSecurity.verifyRememberMeToken(token, dbToken.tokenHash)) {
                throw new types_1.AuthError('Invalid remember me token', 'INVALID_TOKEN', 401);
            }
            // Get user
            const user = await this.repositories.user.findById(dbToken.userId);
            if (!user) {
                throw new types_1.AuthError('User not found', 'USER_NOT_FOUND', 404);
            }
            // Create new session and rotate token if configured
            const result = await this.repositories.withTransaction(async (repos) => {
                // Create new session
                const session = await this.createSession(user.id, {
                    rememberMe: true,
                    isGoogleAuth: false
                }, context);
                // Rotate remember me token if configured
                let newRememberMeToken;
                if (this.config.rememberMe.rotateOnUse) {
                    const { token: newToken } = await this.createRememberMeToken(user.id, context);
                    await repos.rememberMe.invalidateToken(tokenHash);
                    newRememberMeToken = newToken;
                }
                else {
                    // Update last used timestamp
                    await repos.rememberMe.updateLastUsed(tokenHash);
                }
                // Update user last login
                await repos.user.updateLastLogin(user.id);
                // Log remember me usage
                if (repos.audit) {
                    await repos.audit.logAuthEvent({
                        userId: user.id,
                        action: 'REMEMBER_ME_LOGIN',
                        ipAddress: context.ipAddress,
                        userAgent: context.userAgent,
                        success: true,
                        metadata: {
                            tokenRotated: this.config.rememberMe.rotateOnUse,
                            requestId: context.requestId
                        }
                    });
                }
                return { session, newRememberMeToken };
            });
            return {
                success: true,
                user,
                session: result.session,
                rememberMeToken: result.newRememberMeToken
            };
        }
        catch (error) {
            // Log failed remember me attempt
            if (this.repositories.audit) {
                await this.repositories.audit.logAuthEvent({
                    action: 'REMEMBER_ME_FAILED',
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
            throw new types_1.AuthError('Remember me validation failed', 'REMEMBER_ME_FAILED', 500);
        }
    }
    /**
     * Logout user and invalidate session
     */
    async logout(sessionToken, options = {}, context) {
        try {
            // Find session to get user ID
            const session = await this.repositories.session.findByToken(sessionToken);
            if (!session) {
                return; // Session doesn't exist, nothing to do
            }
            await this.repositories.withTransaction(async (repos) => {
                // Invalidate current session
                await repos.session.invalidateSession(sessionToken);
                // Invalidate all user sessions if requested
                if (options.invalidateAllSessions) {
                    await repos.session.invalidateAllUserSessions(session.userId);
                }
                // Invalidate remember me tokens if requested
                if (options.invalidateRememberMe) {
                    await repos.rememberMe.invalidateAllUserTokens(session.userId);
                }
                // Log logout event
                if (repos.audit) {
                    await repos.audit.logAuthEvent({
                        userId: session.userId,
                        action: 'LOGOUT',
                        ipAddress: context.ipAddress,
                        userAgent: context.userAgent,
                        success: true,
                        metadata: {
                            invalidateAllSessions: options.invalidateAllSessions,
                            invalidateRememberMe: options.invalidateRememberMe,
                            requestId: context.requestId
                        }
                    });
                }
            });
        }
        catch (error) {
            console.error('Logout error:', error);
            // Don't throw on logout errors, just log them
        }
    }
    /**
     * Get user by session token
     */
    async getUserBySession(sessionToken) {
        const validation = await this.validateSession(sessionToken, {});
        if (!validation.isValid || !validation.userId) {
            return null;
        }
        return await this.repositories.user.findById(validation.userId);
    }
    /**
     * Change user password
     */
    async changePassword(userId, currentPassword, newPassword, context) {
        try {
            // Validate new password
            const passwordValidation = security_1.PasswordSecurity.validatePassword(newPassword, this.config.passwordPolicy);
            if (!passwordValidation.isValid) {
                throw new types_1.AuthError(`New password does not meet security requirements: ${passwordValidation.errors.join(', ')}`, 'WEAK_PASSWORD');
            }
            // Get user
            const user = await this.repositories.user.findById(userId);
            if (!user || !user.passwordHash) {
                throw new types_1.AuthError('User not found', 'USER_NOT_FOUND', 404);
            }
            // Verify current password
            const isCurrentPasswordValid = await security_1.PasswordSecurity.comparePassword(currentPassword, user.passwordHash);
            if (!isCurrentPasswordValid) {
                throw new types_1.AuthError('Current password is incorrect', 'INVALID_CURRENT_PASSWORD', 400);
            }
            // Hash new password
            const newPasswordHash = await security_1.PasswordSecurity.hashPassword(newPassword);
            await this.repositories.withTransaction(async (repos) => {
                // Update password
                await repos.user.updatePassword(userId, newPasswordHash);
                // Invalidate all sessions except current one to force re-login
                await repos.session.invalidateAllUserSessions(userId);
                // Invalidate all remember me tokens
                await repos.rememberMe.invalidateAllUserTokens(userId);
                // Log password change
                if (repos.audit) {
                    await repos.audit.logSecurityEvent({
                        userId,
                        eventType: 'PASSWORD_CHANGE',
                        severity: 'medium',
                        description: 'User changed password',
                        ipAddress: context.ipAddress,
                        userAgent: context.userAgent,
                        metadata: {
                            requestId: context.requestId
                        }
                    });
                }
            });
        }
        catch (error) {
            if (error instanceof types_1.AuthError) {
                throw error;
            }
            throw new types_1.AuthError('Password change failed', 'PASSWORD_CHANGE_FAILED', 500);
        }
    }
    /**
     * Perform maintenance operations
     */
    async performMaintenance() {
        return await this.repositories.performMaintenance();
    }
}
exports.AuthCore = AuthCore;
//# sourceMappingURL=index.js.map