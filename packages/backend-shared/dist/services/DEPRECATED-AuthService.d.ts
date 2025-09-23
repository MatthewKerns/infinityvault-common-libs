/**
 * DEPRECATED: This service has been replaced by @infinityvault/shared-auth
 *
 * Migration Guide:
 *
 * OLD:
 * import { AuthService } from './AuthService';
 * const authService = new AuthService();
 *
 * NEW:
 * import { AuthCore, GoogleOAuthService, createWebsiteUserRepository, createWebsiteSessionRepository, createWebsiteRememberMeRepository, SecurityValidator } from '@infinityvault/shared-auth';
 * import { db } from '../db';
 *
 * const database = db();
 * const userRepository = createWebsiteUserRepository({}, database);
 * const sessionRepository = createWebsiteSessionRepository({}, database);
 * const rememberMeRepository = createWebsiteRememberMeRepository({}, database);
 * const securityValidator = new SecurityValidator({...});
 * const authCore = new AuthCore(userRepository, sessionRepository, rememberMeRepository, securityValidator);
 * const googleOAuth = new GoogleOAuthService({...}, userRepository, securityValidator);
 *
 * Benefits of new implementation:
 * - Unified authentication system across website and EOS
 * - Enhanced security with PKCE, rate limiting, and audit logging
 * - Remember me token rotation and management
 * - Database-agnostic repository pattern
 * - Better error handling and transaction support
 * - Comprehensive session management
 * - Suspicious activity detection and prevention
 *
 * This file should be removed after all imports are updated.
 */
import type { User, AuthSession } from '@infinityvault/website-middleware';
interface StateParams {
    claimId?: string;
    returnTo?: string;
    rememberMe?: boolean;
    createAccount?: boolean;
    prizeInfo?: string;
}
/**
 * @deprecated Use @infinityvault/shared-auth components instead
 */
export declare class AuthService {
    private oauth2Client;
    private authRepository;
    private userRepository;
    private userService;
    constructor();
    generateAuthUrl(params: StateParams & {
        includeGmail?: boolean;
    }): string;
    private generateSecureState;
    verifyAndParseState(state: string): StateParams | null;
    private exchangeCodeForTokens;
    private getUserInfo;
    handleCallback(code: string, state: string): Promise<{
        success: boolean;
        userInfo?: any;
        authRequest?: StateParams | null;
        error?: string;
    }>;
    handleOAuthCallback(code: string, stateData: any, req: any): Promise<{
        user: User;
        session: AuthSession;
    }>;
    private generateSessionToken;
    createSession(userId: string, req: any, options?: {
        rememberMe?: boolean;
        isGoogleAuth?: boolean;
    }): Promise<AuthSession>;
    validateSession(sessionToken: string): Promise<{
        userId: string;
        expiresAt: Date;
    } | null>;
    getUserBySession(sessionToken: string): Promise<User | null>;
    deleteSession(sessionToken: string): Promise<void>;
    cleanupExpiredSessions(): Promise<void>;
    setCookieAndRedirect(res: any, session: any, user: any, prizeParams: string): void;
}
export {};
