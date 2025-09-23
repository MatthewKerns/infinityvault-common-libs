import type { User, AuthSession } from '@infinityvault/website-middleware';
interface StateParams {
    claimId?: string;
    returnTo?: string;
    rememberMe?: boolean;
    createAccount?: boolean;
    prizeInfo?: string;
}
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
