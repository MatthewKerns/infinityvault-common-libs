import { BaseUser, AuthSession, RememberMeToken, AuthResult, SessionValidationResult, LoginRequest, RegistrationRequest, SessionOptions, SecurityConfig } from '../types';
import { IAuthRepositories } from '../repositories';
import { SecurityValidator } from '../security';
/**
 * Core authentication service with dependency injection
 * Provides consistent authentication behavior across website and EOS systems
 */
export declare class AuthCore {
    private repositories;
    private securityValidator;
    private config;
    constructor(repositories: IAuthRepositories, securityValidator: SecurityValidator, config: SecurityConfig);
    /**
     * Register a new user with email and password
     */
    register(request: RegistrationRequest, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
    }): Promise<AuthResult>;
    /**
     * Login user with email and password
     */
    login(request: LoginRequest, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
    }): Promise<AuthResult>;
    /**
     * Validate an existing session
     */
    validateSession(sessionToken: string, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
    }): Promise<SessionValidationResult>;
    /**
     * Create a new session
     */
    createSession(userId: string, options: SessionOptions, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
    }): Promise<AuthSession>;
    /**
     * Create a remember me token
     */
    createRememberMeToken(userId: string, context: {
        ipAddress?: string;
        userAgent?: string;
    }): Promise<{
        token: string;
        dbToken: RememberMeToken;
    }>;
    /**
     * Validate and use remember me token
     */
    validateRememberMeToken(token: string, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
    }): Promise<AuthResult>;
    /**
     * Logout user and invalidate session
     */
    logout(sessionToken: string, options: {
        invalidateRememberMe?: boolean;
        invalidateAllSessions?: boolean;
    } | undefined, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
    }): Promise<void>;
    /**
     * Get user by session token
     */
    getUserBySession(sessionToken: string): Promise<BaseUser | null>;
    /**
     * Change user password
     */
    changePassword(userId: string, currentPassword: string, newPassword: string, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
    }): Promise<void>;
    /**
     * Perform maintenance operations
     */
    performMaintenance(): Promise<{
        expiredSessions: number;
        expiredTokens: number;
        expiredRateLimits: number;
    }>;
}
export { AuthCore };
//# sourceMappingURL=index.d.ts.map