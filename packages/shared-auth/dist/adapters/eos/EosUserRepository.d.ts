import { BaseUser, DatabaseContext } from '../../types';
import { AbstractRepository, IUserRepository } from '../../repositories';
/**
 * EOS-specific user repository implementation
 */
export declare class EosUserRepository extends AbstractRepository implements IUserRepository {
    private db;
    constructor(config: any, db?: any);
    getContext(): DatabaseContext;
    close(): Promise<void>;
    beginTransaction(): Promise<any>;
    commitTransaction(transaction: any): Promise<void>;
    rollbackTransaction(transaction: any): Promise<void>;
    private initializeDatabase;
    private mapEosUserToBaseUser;
    private mapBaseUserToEosUser;
    private mapOrganizationRoleToRole;
    private mapRoleToOrganizationRole;
    private getDefaultPermissions;
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
    updateEosPermissions(id: string, permissions: string[]): Promise<void>;
    updateOrganizationRole(id: string, organizationRole: string): Promise<void>;
    findUsersByOrganizationRole(organizationRole: string): Promise<BaseUser[]>;
    setDatabase(db: any): void;
}
export declare function createEosUserRepository(config: any, db?: any): EosUserRepository;
//# sourceMappingURL=EosUserRepository.d.ts.map