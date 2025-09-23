import { z } from 'zod';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createHash } from 'crypto';

// Validation schemas
const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  provider: z.enum(['google', 'email']).default('email'),
  providerId: z.string().optional()
});

const LoginCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  system: z.enum(['brand', 'eos'])
});

const TokenPayloadSchema = z.object({
  userId: z.string(),
  email: z.string(),
  system: z.enum(['brand', 'eos']),
  mappedId: z.string().optional()
});

// Types
export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
export type TokenPayload = z.infer<typeof TokenPayloadSchema>;

export interface User {
  id: string;
  email: string;
  brandUserId?: string;
  eosUserId?: string;
  hashedPassword?: string;
  provider: 'google' | 'email';
  providerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResult {
  success: boolean;
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  system: 'brand' | 'eos';
}

export interface UserMapping {
  identityId: string;
  brandUserId: string;
  eosUserId: string;
  email: string;
  createdAt: Date;
}

// Identity Service Implementation
export class UserIdentityService {
  private jwtSecret: string;
  private jwtRefreshSecret: string;
  private tokenExpiry: string = '1h';
  private refreshTokenExpiry: string = '7d';

  // In production, these would be actual database connections
  private userMappings: Map<string, UserMapping> = new Map();
  private users: Map<string, User> = new Map();

  constructor(config?: {
    jwtSecret?: string;
    jwtRefreshSecret?: string;
    tokenExpiry?: string;
    refreshTokenExpiry?: string;
  }) {
    this.jwtSecret = config?.jwtSecret || process.env.JWT_SECRET || 'dev-secret-key';
    this.jwtRefreshSecret = config?.jwtRefreshSecret || process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret';
    this.tokenExpiry = config?.tokenExpiry || '1h';
    this.refreshTokenExpiry = config?.refreshTokenExpiry || '7d';
  }

  /**
   * Create a user in both brand and EOS systems atomically
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    const validated = CreateUserSchema.parse(userData);

    // Generate unique IDs for each system
    const identityId = this.generateId('identity');
    const brandUserId = this.generateId('brand');
    const eosUserId = this.generateId('eos');

    // Hash password if provided
    let hashedPassword: string | undefined;
    if (validated.password && validated.provider === 'email') {
      hashedPassword = await bcrypt.hash(validated.password, 10);
    }

    // Create user record
    const user: User = {
      id: identityId,
      email: validated.email,
      brandUserId,
      eosUserId,
      hashedPassword,
      provider: validated.provider,
      providerId: validated.providerId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Create mapping record
    const mapping: UserMapping = {
      identityId,
      brandUserId,
      eosUserId,
      email: validated.email,
      createdAt: new Date()
    };

    // Store in our maps (in production, these would be database transactions)
    this.users.set(identityId, user);
    this.userMappings.set(validated.email, mapping);

    return user;
  }

  /**
   * Authenticate a user and return appropriate system token
   */
  async authenticateUser(credentials: LoginCredentials): Promise<AuthResult> {
    const validated = LoginCredentialsSchema.parse(credentials);

    // Find user mapping by email
    const mapping = this.userMappings.get(validated.email);
    if (!mapping) {
      throw new Error('User not found');
    }

    // Get user details
    const user = this.users.get(mapping.identityId);
    if (!user) {
      throw new Error('User data not found');
    }

    // Validate password (skip for OAuth users)
    if (user.provider === 'email' && user.hashedPassword) {
      const isValid = await bcrypt.compare(validated.password, user.hashedPassword);
      if (!isValid) {
        throw new Error('Invalid credentials');
      }
    }

    // Determine which user ID to use based on system
    const systemUserId = validated.system === 'brand'
      ? mapping.brandUserId
      : mapping.eosUserId;

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: systemUserId,
      email: user.email,
      system: validated.system,
      mappedId: mapping.identityId
    };

    const accessToken = this.generateAccessToken(tokenPayload);
    const refreshToken = this.generateRefreshToken(tokenPayload);

    return {
      success: true,
      userId: systemUserId,
      accessToken,
      refreshToken,
      expiresIn: 3600, // 1 hour in seconds
      system: validated.system
    };
  }

  /**
   * Map user identity between brand and EOS systems
   */
  async mapUserIdentity(email: string): Promise<UserMapping | null> {
    return this.userMappings.get(email) || null;
  }

  /**
   * Get user by system-specific ID
   */
  async getUserBySystemId(systemId: string, system: 'brand' | 'eos'): Promise<User | null> {
    for (const [, mapping] of this.userMappings) {
      if (system === 'brand' && mapping.brandUserId === systemId) {
        return this.users.get(mapping.identityId) || null;
      }
      if (system === 'eos' && mapping.eosUserId === systemId) {
        return this.users.get(mapping.identityId) || null;
      }
    }
    return null;
  }

  /**
   * Validate a session token
   */
  async validateSession(token: string): Promise<TokenPayload | null> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as TokenPayload;
      return TokenPayloadSchema.parse(decoded);
    } catch (error) {
      return null;
    }
  }

  /**
   * Refresh an access token
   */
  async refreshToken(refreshToken: string): Promise<AuthResult | null> {
    try {
      const decoded = jwt.verify(refreshToken, this.jwtRefreshSecret) as TokenPayload;
      const validated = TokenPayloadSchema.parse(decoded);

      // Generate new access token
      const newAccessToken = this.generateAccessToken(validated);

      return {
        success: true,
        userId: validated.userId,
        accessToken: newAccessToken,
        refreshToken, // Return same refresh token
        expiresIn: 3600,
        system: validated.system
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Link existing accounts across systems
   */
  async linkAccounts(brandUserId: string, eosUserId: string): Promise<boolean> {
    // Find users in each system
    const brandUser = await this.getUserBySystemId(brandUserId, 'brand');
    const eosUser = await this.getUserBySystemId(eosUserId, 'eos');

    if (!brandUser || !eosUser) {
      return false;
    }

    // Verify they're the same user (by email)
    if (brandUser.email !== eosUser.email) {
      throw new Error('Cannot link accounts with different emails');
    }

    // Accounts are already linked if they share the same identity
    return brandUser.id === eosUser.id;
  }

  /**
   * Update user profile across both systems
   */
  async updateUserProfile(
    identityId: string,
    updates: Partial<Pick<User, 'email'>>
  ): Promise<User | null> {
    const user = this.users.get(identityId);
    if (!user) {
      return null;
    }

    // Update user record
    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date()
    };

    this.users.set(identityId, updatedUser);

    // Update mapping if email changed
    if (updates.email && updates.email !== user.email) {
      const mapping = this.userMappings.get(user.email);
      if (mapping) {
        this.userMappings.delete(user.email);
        this.userMappings.set(updates.email, {
          ...mapping,
          email: updates.email
        });
      }
    }

    return updatedUser;
  }

  // Helper methods
  private generateId(prefix: string): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 9);
    return `${prefix}_${timestamp}${random}`;
  }

  private generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.tokenExpiry
    });
  }

  private generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.jwtRefreshSecret, {
      expiresIn: this.refreshTokenExpiry
    });
  }

  /**
   * Generate a deterministic user ID from email (for OAuth users)
   */
  generateDeterministicId(email: string, prefix: string): string {
    const hash = createHash('sha256').update(email).digest('hex');
    return `${prefix}_${hash.substring(0, 16)}`;
  }
}

// Export middleware for Express
export function identityMiddleware(service: UserIdentityService) {
  return async (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const payload = await service.validateSession(token);
    if (!payload) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = payload;
    next();
  };
}

// Export singleton instance
export const identityService = new UserIdentityService();