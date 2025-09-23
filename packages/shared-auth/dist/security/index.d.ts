import { SecurityConfig, RateLimitConfig, OAuthStateParams } from '../types';
import { IRateLimitRepository, IAuditRepository } from '../repositories';
/**
 * Security validation and enforcement for authentication operations
 */
export declare class PKCEUtil {
    /**
     * Generate code verifier for PKCE flow
     */
    static generateCodeVerifier(): string;
    /**
     * Generate code challenge from verifier
     */
    static generateCodeChallenge(verifier: string): string;
    /**
     * Verify code challenge matches verifier
     */
    static verifyCodeChallenge(challenge: string, verifier: string): boolean;
}
export declare class OAuthStateManager {
    private stateSecret;
    constructor(stateSecret: string);
    /**
     * Generate secure state parameter with HMAC signature
     */
    generateState(params: Omit<OAuthStateParams, 'timestamp' | 'nonce'>): string;
    /**
     * Verify and parse state parameter
     */
    verifyAndParseState(state: string): OAuthStateParams | null;
}
export declare class RateLimiter {
    private rateLimitRepo;
    private auditRepo?;
    constructor(rateLimitRepo: IRateLimitRepository, auditRepo?: IAuditRepository);
    /**
     * Check and enforce rate limit for an action
     */
    checkRateLimit(key: string, config: RateLimitConfig, context?: {
        userId?: string;
        ipAddress?: string;
        action: string;
    }): Promise<{
        allowed: boolean;
        remaining: number;
        retryAfter?: number;
    }>;
    /**
     * Check IP-based rate limit
     */
    checkIPRateLimit(ipAddress: string, action: string, config: RateLimitConfig): Promise<void>;
    /**
     * Check user-based rate limit
     */
    checkUserRateLimit(userId: string, action: string, config: RateLimitConfig, ipAddress?: string): Promise<void>;
    /**
     * Reset rate limit for a key (for successful operations)
     */
    resetRateLimit(key: string): Promise<void>;
}
export declare class PasswordSecurity {
    private static readonly SALT_ROUNDS;
    /**
     * Hash password with bcrypt
     */
    static hashPassword(password: string): Promise<string>;
    /**
     * Compare password with hash
     */
    static comparePassword(password: string, hash: string): Promise<boolean>;
    /**
     * Validate password against security policy
     */
    static validatePassword(password: string, policy: SecurityConfig['passwordPolicy']): {
        isValid: boolean;
        errors: string[];
    };
    /**
     * Generate secure random password
     */
    static generateSecurePassword(length?: number): string;
}
export declare class SessionSecurity {
    /**
     * Generate cryptographically secure session token
     */
    static generateSessionToken(): string;
    /**
     * Generate secure remember me token
     */
    static generateRememberMeToken(): {
        token: string;
        hash: string;
        series: string;
    };
    /**
     * Verify remember me token
     */
    static verifyRememberMeToken(token: string, hash: string): boolean;
    /**
     * Generate secure nonce for CSRF protection
     */
    static generateNonce(): string;
    /**
     * Validate session timing to detect suspicious activity
     */
    static validateSessionTiming(lastActivity: Date, currentTime?: Date, maxIdleTimeMs?: number): {
        isValid: boolean;
        shouldRefresh: boolean;
        timeRemaining: number;
    };
}
export declare class SecurityValidator {
    private config;
    private rateLimiter;
    private stateManager;
    private auditRepo?;
    constructor(config: SecurityConfig, rateLimitRepo: IRateLimitRepository, auditRepo?: IAuditRepository);
    /**
     * Validate authentication request
     */
    validateAuthRequest(request: {
        email?: string;
        password?: string;
        rememberMe?: boolean;
    }, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
    }): Promise<void>;
    /**
     * Validate OAuth flow
     */
    validateOAuthFlow(request: {
        state?: string;
        code?: string;
        codeVerifier?: string;
        codeChallenge?: string;
    }, context: {
        ipAddress?: string;
        userAgent?: string;
    }): Promise<OAuthStateParams | null>;
    /**
     * Validate session request
     */
    validateSessionRequest(sessionToken: string, context: {
        ipAddress?: string;
        userAgent?: string;
        userId?: string;
    }): Promise<void>;
    /**
     * Log security event
     */
    logSecurityEvent(eventType: string, severity: 'low' | 'medium' | 'high' | 'critical', description: string, context: {
        userId?: string;
        ipAddress?: string;
        userAgent?: string;
        metadata?: any;
    }): Promise<void>;
    /**
     * Generate OAuth state
     */
    generateOAuthState(params: Omit<OAuthStateParams, 'timestamp' | 'nonce'>): string;
    /**
     * Generate PKCE pair
     */
    generatePKCE(): {
        verifier: string;
        challenge: string;
    };
    /**
     * Reset rate limit after successful operation
     */
    resetRateLimit(key: string): Promise<void>;
}
export { PKCEUtil, OAuthStateManager, RateLimiter, PasswordSecurity, SessionSecurity };
//# sourceMappingURL=index.d.ts.map