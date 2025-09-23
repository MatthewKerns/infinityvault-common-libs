import { AuthSession, BaseUser, DatabaseContext } from '../../types';
import { AbstractRepository, ISessionRepository } from '../../repositories';
/**
 * Website-specific session repository implementation
 */
export declare class WebsiteSessionRepository extends AbstractRepository implements ISessionRepository {
    private db;
    constructor(config: any, db?: any);
    getContext(): DatabaseContext;
    close(): Promise<void>;
    beginTransaction(): Promise<any>;
    commitTransaction(transaction: any): Promise<void>;
    rollbackTransaction(transaction: any): Promise<void>;
    private initializeDatabase;
    private mapWebsiteSessionToAuthSession;
    private mapAuthSessionToWebsiteSession;
    create(sessionData: Partial<AuthSession>): Promise<AuthSession>;
    findByToken(sessionToken: string): Promise<AuthSession | null>;
    findByUserId(userId: string): Promise<AuthSession[]>;
    update(sessionToken: string, sessionData: Partial<AuthSession>): Promise<AuthSession>;
    delete(sessionToken: string): Promise<boolean>;
    invalidateSession(sessionToken: string): Promise<void>;
    invalidateAllUserSessions(userId: string): Promise<void>;
    cleanupExpiredSessions(): Promise<number>;
    extendSession(sessionToken: string, expiresAt: Date): Promise<void>;
    getActiveSessions(): Promise<AuthSession[]>;
    getUserSessionCount(userId: string): Promise<number>;
    getSessionStats(): Promise<{
        total: number;
        active: number;
        expired: number;
    }>;
    findUserBySessionToken(sessionToken: string): Promise<BaseUser | null>;
    findSessionsByIPAddress(ipAddress: string, timeframe?: number): Promise<AuthSession[]>;
    updateSessionActivity(sessionToken: string): Promise<void>;
    setDatabase(db: any): void;
}
export declare function createWebsiteSessionRepository(config: any, db?: any): WebsiteSessionRepository;
//# sourceMappingURL=WebsiteSessionRepository.d.ts.map