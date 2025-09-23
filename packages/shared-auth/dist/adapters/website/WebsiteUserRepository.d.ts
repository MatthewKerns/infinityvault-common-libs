import { BaseUser, DatabaseContext } from '../../types';
import { AbstractRepository, IUserRepository } from '../../repositories';
/**
 * Website-specific user repository implementation
 */
export declare class WebsiteUserRepository extends AbstractRepository implements IUserRepository {
    private db;
    constructor(config: any, db?: any);
    getContext(): DatabaseContext;
    close(): Promise<void>;
    beginTransaction(): Promise<any>;
    commitTransaction(transaction: any): Promise<void>;
    rollbackTransaction(transaction: any): Promise<void>;
    private initializeDatabase;
    private mapWebsiteUserToBaseUser;
    private mapBaseUserToWebsiteUser;
    findById(id: string): Promise<BaseUser | null>;
    findByEmail(email: string): Promise<BaseUser | null>;
    create(userData: Partial<BaseUser>): Promise<BaseUser>;
    update(id: string, userData: Partial<BaseUser>): Promise<BaseUser>;
    delete(id: string): Promise<boolean>;
    updateLastLogin(id: string): Promise<void>;
    updatePassword(id: string, passwordHash: string): Promise<void>;
    updateEmailVerification(id: string, isVerified: boolean): Promise<void>;
    findByIds(ids: string[]): Promise<BaseUser[]>;
    countUsers(): Promise<number>;
    findActiveUsers(limit?: number): Promise<BaseUser[]>;
    findUsersByRole(role: string): Promise<BaseUser[]>;
    searchUsers(query: string, limit?: number): Promise<BaseUser[]>;
    findByPhoneNumber(phoneNumber: string): Promise<BaseUser | null>;
    updateMarketingConsent(id: string, consent: boolean): Promise<void>;
    updatePhoneVerification(id: string, phoneNumber: string, isVerified: boolean): Promise<void>;
    setDatabase(db: any): void;
}
export declare function createWebsiteUserRepository(config: any, db?: any): WebsiteUserRepository;
//# sourceMappingURL=WebsiteUserRepository.d.ts.map