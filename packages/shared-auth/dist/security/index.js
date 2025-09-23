"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityValidator = exports.SessionSecurity = exports.PasswordSecurity = exports.RateLimiter = exports.OAuthStateManager = exports.PKCEUtil = void 0;
const crypto_1 = __importDefault(require("crypto"));
const types_1 = require("../types");
/**
 * Security validation and enforcement for authentication operations
 */
// PKCE (Proof Key for Code Exchange) utilities
class PKCEUtil {
    /**
     * Generate code verifier for PKCE flow
     */
    static generateCodeVerifier() {
        return crypto_1.default.randomBytes(32).toString('base64url');
    }
    /**
     * Generate code challenge from verifier
     */
    static generateCodeChallenge(verifier) {
        return crypto_1.default.createHash('sha256').update(verifier).digest('base64url');
    }
    /**
     * Verify code challenge matches verifier
     */
    static verifyCodeChallenge(challenge, verifier) {
        const expectedChallenge = this.generateCodeChallenge(verifier);
        return challenge === expectedChallenge;
    }
}
exports.PKCEUtil = PKCEUtil;
// OAuth state management with enhanced security
class OAuthStateManager {
    constructor(stateSecret) {
        this.stateSecret = stateSecret;
    }
    /**
     * Generate secure state parameter with HMAC signature
     */
    generateState(params) {
        const stateData = {
            ...params,
            timestamp: Date.now(),
            nonce: crypto_1.default.randomBytes(16).toString('hex')
        };
        // Validate state data
        const validationResult = types_1.OAuthStateParamsSchema.safeParse(stateData);
        if (!validationResult.success) {
            throw new types_1.SecurityError('Invalid state parameters', 'INVALID_STATE_PARAMS');
        }
        const stateString = Buffer.from(JSON.stringify(stateData)).toString('base64');
        const signature = crypto_1.default
            .createHmac('sha256', this.stateSecret)
            .update(stateString)
            .digest('hex');
        return `${stateString}.${signature}`;
    }
    /**
     * Verify and parse state parameter
     */
    verifyAndParseState(state) {
        try {
            const [stateString, signature] = state.split('.');
            if (!stateString || !signature) {
                return null;
            }
            // Verify HMAC signature
            const expectedSignature = crypto_1.default
                .createHmac('sha256', this.stateSecret)
                .update(stateString)
                .digest('hex');
            if (!crypto_1.default.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expectedSignature, 'hex'))) {
                return null;
            }
            // Parse and validate state data
            const stateData = JSON.parse(Buffer.from(stateString, 'base64').toString());
            const validationResult = types_1.OAuthStateParamsSchema.safeParse(stateData);
            if (!validationResult.success) {
                return null;
            }
            // Check if state is expired (5 minutes max)
            const maxAge = 5 * 60 * 1000; // 5 minutes
            if (Date.now() - stateData.timestamp > maxAge) {
                return null;
            }
            return stateData;
        }
        catch {
            return null;
        }
    }
}
exports.OAuthStateManager = OAuthStateManager;
// Rate limiting enforcement
class RateLimiter {
    constructor(rateLimitRepo, auditRepo) {
        this.rateLimitRepo = rateLimitRepo;
        this.auditRepo = auditRepo;
    }
    /**
     * Check and enforce rate limit for an action
     */
    async checkRateLimit(key, config, context) {
        try {
            // Check if key is currently blocked
            const isBlocked = await this.rateLimitRepo.isBlocked(key);
            if (isBlocked) {
                const retryAfter = Math.ceil(config.blockDurationMs / 1000);
                // Log security event
                if (this.auditRepo && context) {
                    await this.auditRepo.logSecurityEvent({
                        userId: context.userId,
                        eventType: 'RATE_LIMIT_BLOCKED',
                        severity: 'medium',
                        description: `Rate limit blocked for action: ${context.action}`,
                        ipAddress: context.ipAddress,
                        metadata: { key, action: context.action, retryAfter }
                    });
                }
                return {
                    allowed: false,
                    remaining: 0,
                    retryAfter
                };
            }
            // Get current attempt count
            const currentAttempts = await this.rateLimitRepo.getAttemptCount(key, config.windowMs);
            if (currentAttempts >= config.maxAttempts) {
                // Block the key for the specified duration
                await this.rateLimitRepo.blockKey(key, config.blockDurationMs);
                const retryAfter = Math.ceil(config.blockDurationMs / 1000);
                // Log security event
                if (this.auditRepo && context) {
                    await this.auditRepo.logSecurityEvent({
                        userId: context.userId,
                        eventType: 'RATE_LIMIT_EXCEEDED',
                        severity: 'high',
                        description: `Rate limit exceeded for action: ${context.action}`,
                        ipAddress: context.ipAddress,
                        metadata: {
                            key,
                            action: context.action,
                            attempts: currentAttempts,
                            maxAttempts: config.maxAttempts,
                            retryAfter
                        }
                    });
                }
                throw new types_1.RateLimitError(`Rate limit exceeded. Too many attempts for ${context?.action || 'this action'}`, retryAfter);
            }
            // Increment attempt count
            const newAttempts = await this.rateLimitRepo.incrementAttempts(key, config.windowMs);
            const remaining = Math.max(0, config.maxAttempts - newAttempts);
            return {
                allowed: true,
                remaining
            };
        }
        catch (error) {
            if (error instanceof types_1.RateLimitError) {
                throw error;
            }
            // Log unexpected error but allow the operation (fail open)
            console.error('Rate limiting error:', error);
            return {
                allowed: true,
                remaining: config.maxAttempts
            };
        }
    }
    /**
     * Check IP-based rate limit
     */
    async checkIPRateLimit(ipAddress, action, config) {
        const key = `ip:${ipAddress}:${action}`;
        const result = await this.checkRateLimit(key, config, {
            ipAddress,
            action
        });
        if (!result.allowed) {
            throw new types_1.RateLimitError(`Too many ${action} attempts from this IP address`, result.retryAfter || Math.ceil(config.blockDurationMs / 1000));
        }
    }
    /**
     * Check user-based rate limit
     */
    async checkUserRateLimit(userId, action, config, ipAddress) {
        const key = `user:${userId}:${action}`;
        const result = await this.checkRateLimit(key, config, {
            userId,
            ipAddress,
            action
        });
        if (!result.allowed) {
            throw new types_1.RateLimitError(`Too many ${action} attempts for this user`, result.retryAfter || Math.ceil(config.blockDurationMs / 1000));
        }
    }
    /**
     * Reset rate limit for a key (for successful operations)
     */
    async resetRateLimit(key) {
        await this.rateLimitRepo.resetAttempts(key);
    }
}
exports.RateLimiter = RateLimiter;
// Password security utilities
class PasswordSecurity {
    /**
     * Hash password with bcrypt
     */
    static async hashPassword(password) {
        const bcrypt = await Promise.resolve().then(() => __importStar(require('bcrypt')));
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }
    /**
     * Compare password with hash
     */
    static async comparePassword(password, hash) {
        const bcrypt = await Promise.resolve().then(() => __importStar(require('bcrypt')));
        return bcrypt.compare(password, hash);
    }
    /**
     * Validate password against security policy
     */
    static validatePassword(password, policy) {
        const errors = [];
        if (password.length < policy.minLength) {
            errors.push(`Password must be at least ${policy.minLength} characters long`);
        }
        if (policy.requireUppercase && !/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (policy.requireLowercase && !/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        if (policy.requireNumbers && !/\d/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        if (policy.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    /**
     * Generate secure random password
     */
    static generateSecurePassword(length = 16) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return password;
    }
}
exports.PasswordSecurity = PasswordSecurity;
PasswordSecurity.SALT_ROUNDS = 12;
// Session security utilities
class SessionSecurity {
    /**
     * Generate cryptographically secure session token
     */
    static generateSessionToken() {
        return crypto_1.default.randomBytes(32).toString('hex');
    }
    /**
     * Generate secure remember me token
     */
    static generateRememberMeToken() {
        const token = crypto_1.default.randomBytes(32).toString('hex');
        const series = crypto_1.default.randomBytes(16).toString('hex');
        const hash = crypto_1.default.createHash('sha256').update(token).digest('hex');
        return { token, hash, series };
    }
    /**
     * Verify remember me token
     */
    static verifyRememberMeToken(token, hash) {
        const computedHash = crypto_1.default.createHash('sha256').update(token).digest('hex');
        return crypto_1.default.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(computedHash, 'hex'));
    }
    /**
     * Generate secure nonce for CSRF protection
     */
    static generateNonce() {
        return crypto_1.default.randomBytes(16).toString('base64');
    }
    /**
     * Validate session timing to detect suspicious activity
     */
    static validateSessionTiming(lastActivity, currentTime = new Date(), maxIdleTimeMs = 30 * 60 * 1000 // 30 minutes
    ) {
        const timeSinceActivity = currentTime.getTime() - lastActivity.getTime();
        const isValid = timeSinceActivity <= maxIdleTimeMs;
        const shouldRefresh = timeSinceActivity > (maxIdleTimeMs * 0.8); // Refresh at 80% of max idle time
        const timeRemaining = Math.max(0, maxIdleTimeMs - timeSinceActivity);
        return {
            isValid,
            shouldRefresh,
            timeRemaining
        };
    }
}
exports.SessionSecurity = SessionSecurity;
// Main security validator class
class SecurityValidator {
    constructor(config, rateLimitRepo, auditRepo) {
        this.config = config;
        this.rateLimiter = new RateLimiter(rateLimitRepo, auditRepo);
        this.stateManager = new OAuthStateManager(config.oauth.stateSecret);
        this.auditRepo = auditRepo;
    }
    /**
     * Validate authentication request
     */
    async validateAuthRequest(request, context) {
        // IP-based rate limiting for authentication attempts
        if (context.ipAddress) {
            await this.rateLimiter.checkIPRateLimit(context.ipAddress, 'auth_attempt', this.config.rateLimiting.auth);
        }
        // Email-based rate limiting if provided
        if (request.email) {
            await this.rateLimiter.checkUserRateLimit(request.email, 'auth_attempt', this.config.rateLimiting.auth, context.ipAddress);
        }
        // Validate password if provided
        if (request.password) {
            const passwordValidation = PasswordSecurity.validatePassword(request.password, this.config.passwordPolicy);
            if (!passwordValidation.isValid) {
                throw new types_1.SecurityError(`Password does not meet security requirements: ${passwordValidation.errors.join(', ')}`, 'WEAK_PASSWORD');
            }
        }
    }
    /**
     * Validate OAuth flow
     */
    async validateOAuthFlow(request, context) {
        // IP-based rate limiting for OAuth attempts
        if (context.ipAddress) {
            await this.rateLimiter.checkIPRateLimit(context.ipAddress, 'oauth_attempt', this.config.rateLimiting.oauth);
        }
        // Validate state parameter
        if (!request.state) {
            throw new types_1.SecurityError('Missing state parameter', 'MISSING_STATE');
        }
        const stateData = this.stateManager.verifyAndParseState(request.state);
        if (!stateData) {
            throw new types_1.SecurityError('Invalid or expired state parameter', 'INVALID_STATE');
        }
        // Validate PKCE if provided
        if (request.codeChallenge && request.codeVerifier) {
            const isValidPKCE = PKCEUtil.verifyCodeChallenge(request.codeChallenge, request.codeVerifier);
            if (!isValidPKCE) {
                throw new types_1.SecurityError('Invalid PKCE verification', 'INVALID_PKCE');
            }
        }
        return stateData;
    }
    /**
     * Validate session request
     */
    async validateSessionRequest(sessionToken, context) {
        // IP-based rate limiting for session validation
        if (context.ipAddress) {
            await this.rateLimiter.checkIPRateLimit(context.ipAddress, 'session_check', this.config.rateLimiting.session);
        }
        // Basic session token validation
        if (!sessionToken || sessionToken.length < 32) {
            throw new types_1.SecurityError('Invalid session token format', 'INVALID_SESSION_TOKEN');
        }
    }
    /**
     * Log security event
     */
    async logSecurityEvent(eventType, severity, description, context) {
        if (this.auditRepo) {
            await this.auditRepo.logSecurityEvent({
                userId: context.userId,
                eventType,
                severity,
                description,
                ipAddress: context.ipAddress,
                userAgent: context.userAgent,
                metadata: context.metadata
            });
        }
    }
    /**
     * Generate OAuth state
     */
    generateOAuthState(params) {
        return this.stateManager.generateState(params);
    }
    /**
     * Generate PKCE pair
     */
    generatePKCE() {
        const verifier = PKCEUtil.generateCodeVerifier();
        const challenge = PKCEUtil.generateCodeChallenge(verifier);
        return { verifier, challenge };
    }
    /**
     * Reset rate limit after successful operation
     */
    async resetRateLimit(key) {
        await this.rateLimiter.resetRateLimit(key);
    }
}
exports.SecurityValidator = SecurityValidator;
//# sourceMappingURL=index.js.map