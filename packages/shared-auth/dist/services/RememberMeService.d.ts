import { RememberMeToken, SecurityConfig, BaseUser } from '../types';
import { IRememberMeRepository, IUserRepository, IAuditRepository } from '../repositories';
/**
 * Remember me token service with automatic rotation and security monitoring
 */
export declare class RememberMeService {
    private rememberMeRepo;
    private userRepo;
    private auditRepo?;
    private config;
    constructor(rememberMeRepo: IRememberMeRepository, userRepo: IUserRepository, config: SecurityConfig, auditRepo?: IAuditRepository);
    /**
     * Create a new remember me token for a user
     */
    createToken(userId: string, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
    }): Promise<{
        token: string;
        series: string;
        expiresAt: Date;
    }>;
    /**
     * Validate and use a remember me token
     */
    validateToken(token: string, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
    }): Promise<{
        isValid: boolean;
        user?: BaseUser;
        newToken?: string;
        series?: string;
        error?: string;
    }>;
    /**
     * Rotate a remember me token
     */
    rotateToken(currentToken: RememberMeToken, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
    }): Promise<{
        newToken: string;
        series: string;
    }>;
    /**
     * Invalidate a remember me token
     */
    invalidateToken(tokenOrSeries: string, isSeriesLookup: boolean | undefined, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
        reason?: string;
    }): Promise<void>;
    /**
     * Invalidate all remember me tokens for a user
     */
    invalidateAllUserTokens(userId: string, context: {
        ipAddress?: string;
        userAgent?: string;
        requestId?: string;
        reason?: string;
    }): Promise<{
        invalidatedCount: number;
    }>;
    /**
     * Get active remember me tokens for a user
     */
    getUserActiveTokens(userId: string): Promise<{
        tokens: Omit<RememberMeToken, 'tokenHash'>[];
        count: number;
    }>;
    /**
     * Clean up expired remember me tokens
     */
    cleanupExpiredTokens(): Promise<{
        cleanedCount: number;
    }>;
    /**
     * Handle suspicious remember me activity
     */
    private handleSuspiciousActivity;
    /**
     * Get remember me token statistics
     */
    getTokenStats(): Promise<{
        totalTokens: number;
        activeTokens: number;
        expiredTokens: number;
        tokensPerUser: {
            average: number;
            max: number;
        };
    }>;
    /**
     * Monitor for token abuse patterns
     */
    detectTokenAbuse(timeframe?: number): Promise<{
        suspiciousPatterns: Array<{
            type: string;
            userId: string;
            count: number;
            severity: 'low' | 'medium' | 'high';
            description: string;
        }>;
    }>;
}
export { RememberMeService };
//# sourceMappingURL=RememberMeService.d.ts.map