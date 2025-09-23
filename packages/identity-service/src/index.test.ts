import { describe, it, expect, beforeEach } from 'vitest';
import { UserIdentityService } from './index';

describe('UserIdentityService', () => {
  let service: UserIdentityService;

  beforeEach(() => {
    service = new UserIdentityService({
      jwtSecret: 'test-secret',
      jwtRefreshSecret: 'test-refresh-secret'
    });
  });

  describe('User Creation', () => {
    it('should create a user with both brand and EOS IDs', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePassword123',
        firstName: 'John',
        lastName: 'Doe'
      };

      const user = await service.createUser(userData);

      expect(user).toBeDefined();
      expect(user.email).toBe('test@example.com');
      expect(user.brandUserId).toBeDefined();
      expect(user.eosUserId).toBeDefined();
      expect(user.brandUserId).not.toBe(user.eosUserId);
      expect(user.hashedPassword).toBeDefined();
      expect(user.provider).toBe('email');
    });

    it('should create OAuth user without password', async () => {
      const userData = {
        email: 'oauth@example.com',
        password: '',
        provider: 'google' as const,
        providerId: 'google-123'
      };

      const user = await service.createUser(userData);

      expect(user.provider).toBe('google');
      expect(user.providerId).toBe('google-123');
      expect(user.hashedPassword).toBeUndefined();
    });

    it('should reject invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'SecurePassword123'
      };

      await expect(service.createUser(userData)).rejects.toThrow();
    });

    it('should reject short password', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'short'
      };

      await expect(service.createUser(userData)).rejects.toThrow();
    });
  });

  describe('Authentication', () => {
    beforeEach(async () => {
      // Create test user
      await service.createUser({
        email: 'auth@example.com',
        password: 'TestPassword123'
      });
    });

    it('should authenticate user for brand system', async () => {
      const result = await service.authenticateUser({
        email: 'auth@example.com',
        password: 'TestPassword123',
        system: 'brand'
      });

      expect(result.success).toBe(true);
      expect(result.system).toBe('brand');
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(result.userId).toContain('brand_');
    });

    it('should authenticate user for EOS system', async () => {
      const result = await service.authenticateUser({
        email: 'auth@example.com',
        password: 'TestPassword123',
        system: 'eos'
      });

      expect(result.success).toBe(true);
      expect(result.system).toBe('eos');
      expect(result.userId).toContain('eos_');
    });

    it('should reject invalid password', async () => {
      await expect(service.authenticateUser({
        email: 'auth@example.com',
        password: 'WrongPassword',
        system: 'brand'
      })).rejects.toThrow('Invalid credentials');
    });

    it('should reject non-existent user', async () => {
      await expect(service.authenticateUser({
        email: 'nonexistent@example.com',
        password: 'TestPassword123',
        system: 'brand'
      })).rejects.toThrow('User not found');
    });
  });

  describe('User Mapping', () => {
    it('should map user identity between systems', async () => {
      const user = await service.createUser({
        email: 'mapping@example.com',
        password: 'TestPassword123'
      });

      const mapping = await service.mapUserIdentity('mapping@example.com');

      expect(mapping).toBeDefined();
      expect(mapping?.brandUserId).toBe(user.brandUserId);
      expect(mapping?.eosUserId).toBe(user.eosUserId);
      expect(mapping?.email).toBe('mapping@example.com');
    });

    it('should return null for non-existent mapping', async () => {
      const mapping = await service.mapUserIdentity('nonexistent@example.com');
      expect(mapping).toBeNull();
    });
  });

  describe('Session Validation', () => {
    it('should validate valid access token', async () => {
      const user = await service.createUser({
        email: 'session@example.com',
        password: 'TestPassword123'
      });

      const auth = await service.authenticateUser({
        email: 'session@example.com',
        password: 'TestPassword123',
        system: 'brand'
      });

      const payload = await service.validateSession(auth.accessToken);

      expect(payload).toBeDefined();
      expect(payload?.email).toBe('session@example.com');
      expect(payload?.system).toBe('brand');
    });

    it('should reject invalid token', async () => {
      const payload = await service.validateSession('invalid-token');
      expect(payload).toBeNull();
    });
  });

  describe('Token Refresh', () => {
    it('should refresh valid refresh token', async () => {
      await service.createUser({
        email: 'refresh@example.com',
        password: 'TestPassword123'
      });

      const auth = await service.authenticateUser({
        email: 'refresh@example.com',
        password: 'TestPassword123',
        system: 'brand'
      });

      const refreshed = await service.refreshToken(auth.refreshToken);

      expect(refreshed).toBeDefined();
      expect(refreshed?.success).toBe(true);
      expect(refreshed?.accessToken).toBeDefined();
      expect(refreshed?.accessToken).not.toBe(auth.accessToken);
    });

    it('should reject invalid refresh token', async () => {
      const refreshed = await service.refreshToken('invalid-refresh-token');
      expect(refreshed).toBeNull();
    });
  });

  describe('Account Linking', () => {
    it('should verify linked accounts', async () => {
      const user = await service.createUser({
        email: 'linked@example.com',
        password: 'TestPassword123'
      });

      const isLinked = await service.linkAccounts(
        user.brandUserId!,
        user.eosUserId!
      );

      expect(isLinked).toBe(true);
    });

    it('should reject linking different users', async () => {
      const user1 = await service.createUser({
        email: 'user1@example.com',
        password: 'TestPassword123'
      });

      const user2 = await service.createUser({
        email: 'user2@example.com',
        password: 'TestPassword123'
      });

      await expect(service.linkAccounts(
        user1.brandUserId!,
        user2.eosUserId!
      )).rejects.toThrow('Cannot link accounts with different emails');
    });
  });

  describe('Profile Updates', () => {
    it('should update user profile across systems', async () => {
      const user = await service.createUser({
        email: 'update@example.com',
        password: 'TestPassword123'
      });

      const updated = await service.updateUserProfile(user.id, {
        email: 'newemail@example.com'
      });

      expect(updated?.email).toBe('newemail@example.com');

      // Verify mapping is updated
      const oldMapping = await service.mapUserIdentity('update@example.com');
      const newMapping = await service.mapUserIdentity('newemail@example.com');

      expect(oldMapping).toBeNull();
      expect(newMapping).toBeDefined();
      expect(newMapping?.brandUserId).toBe(user.brandUserId);
    });

    it('should return null for non-existent user', async () => {
      const updated = await service.updateUserProfile('nonexistent_id', {
        email: 'new@example.com'
      });

      expect(updated).toBeNull();
    });
  });

  describe('Cross-System User Retrieval', () => {
    it('should get user by brand system ID', async () => {
      const created = await service.createUser({
        email: 'retrieval@example.com',
        password: 'TestPassword123'
      });

      const user = await service.getUserBySystemId(created.brandUserId!, 'brand');

      expect(user).toBeDefined();
      expect(user?.email).toBe('retrieval@example.com');
      expect(user?.id).toBe(created.id);
    });

    it('should get user by EOS system ID', async () => {
      const created = await service.createUser({
        email: 'retrieval2@example.com',
        password: 'TestPassword123'
      });

      const user = await service.getUserBySystemId(created.eosUserId!, 'eos');

      expect(user).toBeDefined();
      expect(user?.email).toBe('retrieval2@example.com');
      expect(user?.id).toBe(created.id);
    });

    it('should return null for non-existent system ID', async () => {
      const user = await service.getUserBySystemId('nonexistent_brand_123', 'brand');
      expect(user).toBeNull();
    });
  });
});

describe('End-to-End User Journey', () => {
  let service: UserIdentityService;

  beforeEach(() => {
    service = new UserIdentityService({
      jwtSecret: 'test-secret',
      jwtRefreshSecret: 'test-refresh-secret'
    });
  });

  it('should support complete user journey across both systems', async () => {
    // 1. User signs up
    const user = await service.createUser({
      email: 'journey@example.com',
      password: 'SecurePassword123'
    });

    expect(user).toBeDefined();

    // 2. User logs into brand website
    const brandAuth = await service.authenticateUser({
      email: 'journey@example.com',
      password: 'SecurePassword123',
      system: 'brand'
    });

    expect(brandAuth.success).toBe(true);
    expect(brandAuth.system).toBe('brand');

    // 3. Validate brand session
    const brandSession = await service.validateSession(brandAuth.accessToken);
    expect(brandSession?.system).toBe('brand');

    // 4. User accesses EOS system with same credentials
    const eosAuth = await service.authenticateUser({
      email: 'journey@example.com',
      password: 'SecurePassword123',
      system: 'eos'
    });

    expect(eosAuth.success).toBe(true);
    expect(eosAuth.system).toBe('eos');
    expect(eosAuth.userId).not.toBe(brandAuth.userId); // Different system IDs

    // 5. Validate EOS session
    const eosSession = await service.validateSession(eosAuth.accessToken);
    expect(eosSession?.system).toBe('eos');

    // 6. Verify mapping exists
    const mapping = await service.mapUserIdentity('journey@example.com');
    expect(mapping?.brandUserId).toBe(brandAuth.userId);
    expect(mapping?.eosUserId).toBe(eosAuth.userId);

    // 7. Update profile from brand system
    const updatedUser = await service.updateUserProfile(user.id, {
      email: 'journeyupdated@example.com'
    });

    expect(updatedUser?.email).toBe('journeyupdated@example.com');

    // 8. Verify update visible in both systems
    const brandUser = await service.getUserBySystemId(brandAuth.userId, 'brand');
    const eosUser = await service.getUserBySystemId(eosAuth.userId, 'eos');

    expect(brandUser?.email).toBe('journeyupdated@example.com');
    expect(eosUser?.email).toBe('journeyupdated@example.com');

    // 9. Refresh token works
    const refreshed = await service.refreshToken(brandAuth.refreshToken);
    expect(refreshed?.success).toBe(true);

    // 10. Verify accounts are linked
    const linked = await service.linkAccounts(brandAuth.userId, eosAuth.userId);
    expect(linked).toBe(true);
  });
});