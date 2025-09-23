import { GoogleUserInfo, OAuthStateParams, AuthResult, SecurityConfig } from '../types';
import { IAuthRepositories } from '../repositories';
import { SecurityValidator } from '../security';
import { AuthCore } from '../core';
/**
 * Google OAuth service with enhanced security features
 */
export declare class GoogleOAuthService {
    private oauth2Client;
    private authCore;
    private repositories;
    private securityValidator;
    private config;
    constructor(clientId: string, clientSecret: string, redirectUri: string, authCore: AuthCore, repositories: IAuthRepositories, securityValidator: SecurityValidator, config: SecurityConfig);
    /**
     * Generate OAuth authorization URL with PKCE and state validation
     */
    generateAuthUrl(params: Omit<OAuthStateParams, 'timestamp' | 'nonce'> & {
        includeGmail?: boolean;
        usePKCE?: boolean;
    }, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
    }): {
        url: string;
        codeVerifier?: string;
        state: string;
    };
    /**
     * Handle OAuth callback with enhanced security validation
     */
    handleCallback(code: string, state: string, codeVerifier: string | undefined, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
    }): Promise<AuthResult>;
    /**
     * Get user information from Google OAuth API
     */
    private getUserInfo;
    /**
     * Find existing user or create new user from Google OAuth
     */
    private findOrCreateUser;
    /**
     * Refresh access token using refresh token
     */
    refreshAccessToken(refreshToken: string): Promise<{
        accessToken: string;
        expiresIn: number;
        newRefreshToken?: string;
    }>;
    /**
     * Revoke Google OAuth tokens
     */
    revokeTokens(accessToken: string): Promise<void>;
    /**
     * Validate Google OAuth token
     */
    validateToken(accessToken: string): Promise<{
        isValid: boolean;
        userInfo?: GoogleUserInfo;
        expiresAt?: Date;
    }>;
    /**
     * Get user's Google profile with additional permissions
     */
    getUserProfile(accessToken: string, includeContacts?: boolean): Promise<{
        userInfo: GoogleUserInfo;
        profile?: any;
        contacts?: any[];
    }>;
    /**
     * Configure OAuth client with custom settings
     */
    configureClient(options: {
        timeout?: number;
        retries?: number;
        additionalScopes?: string[];
    }): void;
}
export interface GoogleOAuthConfig {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    scopes?: string[];
    usePKCE?: boolean;
    includeRefreshToken?: boolean;
    timeout?: number;
}
export declare function createGoogleOAuthService(config: GoogleOAuthConfig, authCore: AuthCore, repositories: IAuthRepositories, securityValidator: SecurityValidator, securityConfig: SecurityConfig): GoogleOAuthService;
export { GoogleOAuthService };
//# sourceMappingURL=GoogleOAuthService.d.ts.map