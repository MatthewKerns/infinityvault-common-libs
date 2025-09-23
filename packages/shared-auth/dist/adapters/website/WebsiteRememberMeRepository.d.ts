import { RememberMeToken, DatabaseContext } from '../../types';
import { AbstractRepository, IRememberMeRepository } from '../../repositories';
/**
 * Website-specific remember me token repository implementation
 */
export declare class WebsiteRememberMeRepository extends AbstractRepository implements IRememberMeRepository {
    private db;
    constructor(config: any, db?: any);
    getContext(): DatabaseContext;
    close(): Promise<void>;
    beginTransaction(): Promise<any>;
    commitTransaction(transaction: any): Promise<void>;
    rollbackTransaction(transaction: any): Promise<void>;
    private initializeDatabase;
    private mapWebsiteTokenToRememberMeToken;
    private mapRememberMeTokenToWebsiteToken;
    create(tokenData: Partial<RememberMeToken>): Promise<RememberMeToken>;
    findByTokenHash(tokenHash: string): Promise<RememberMeToken | null>;
    findBySeries(series: string): Promise<RememberMeToken | null>;
    findByUserId(userId: string): Promise<RememberMeToken[]>;
    update(tokenHash: string, tokenData: Partial<RememberMeToken>): Promise<RememberMeToken>;
    delete(tokenHash: string): Promise<boolean>;
    invalidateToken(tokenHash: string): Promise<void>;
    invalidateAllUserTokens(userId: string): Promise<void>;
    cleanupExpiredTokens(): Promise<number>;
    updateLastUsed(tokenHash: string): Promise<void>;
    rotateToken(oldTokenHash: string, newTokenData: Partial<RememberMeToken>): Promise<RememberMeToken>;
    getUserTokenCount(userId: string): Promise<number>;
    cleanupExcessTokens(userId: string, maxTokens: number): Promise<number>;
    setDatabase(db: any): void;
}
export declare function createWebsiteRememberMeRepository(config: any, db?: any): WebsiteRememberMeRepository;
//# sourceMappingURL=WebsiteRememberMeRepository.d.ts.map