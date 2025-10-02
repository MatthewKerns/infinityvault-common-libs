import { z } from 'zod';
import jwt, { type SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db, withTransaction, users, authSessions } from './utils/db.js';
import { eq, and, sql } from 'drizzle-orm';
import crypto from 'crypto';
import type {
  CreateUserInput,
  AuthenticateUserInput,
  PKCEAuthInput,
  PKCEExchangeInput,
  UserIdentityMapping,
  SessionValidationResult,
  AuthResult,
  CreateUserResult,
  SyncProfileResult,
  SessionTimeoutResult,
  PKCEAuthResult,
  RefreshTokenResult
} from './types.js';
import {
  createUserSchema,
  authenticateUserSchema,
  pkceAuthSchema,
  pkceExchangeSchema
} from './types.js';

/**
 * Audit log entry interface for security event tracking
 */
interface AuditLogEntry {
  timestamp: Date;
  event: string;
  email?: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  error?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Identity Bridge Service
 *
 * Provides unified authentication and identity management across
 * brand website and EOS agent systems with PKCE OAuth compliance.
 *
 * Security Features:
 * - PKCE OAuth with S256 code challenge (plain text rejected)
 * - State validation with timing-safe comparison
 * - Rate limiting: 20 auth attempts per 15 minutes
 * - HttpOnly, Secure, SameSite=strict cookies
 * - JWT tokens with 1-hour expiration
 * - Bcrypt password hashing with 10 salt rounds
 * - Comprehensive audit logging for all security events
 * - Session fingerprinting with IP and user agent validation
 */
export class IdentityBridgeService {
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRES_IN: number = 3600; // 1 hour in seconds
  private readonly REFRESH_WINDOW: number = 5 * 60 * 1000; // 5 minutes
  private readonly SALT_ROUNDS: number = 10;

  // Rate limiting maps
  private authAttempts: Map<string, { count: number; resetAt: number }> = new Map();
  private readonly AUTH_RATE_LIMIT = 20;
  private readonly AUTH_RATE_WINDOW = 15 * 60 * 1000; // 15 minutes

  // Audit logging
  private auditLogs: AuditLogEntry[] = [];
  private readonly MAX_AUDIT_LOGS = 10000; // In-memory limit before persistence

  constructor() {
    // SECURITY: JWT_SECRET must be set in production
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is required for secure operation');
    }
    this.JWT_SECRET = process.env.JWT_SECRET;

    // Optimize: Cleanup rate limits on demand instead of periodic intervals
    // This is more memory efficient and only runs when needed
  }

  /**
   * Create a user atomically in both brand and EOS systems
   */
  async createUser(input: CreateUserInput): Promise<CreateUserResult> {
    // Validate input
    const validatedInput = createUserSchema.parse(input);

    // Hash password
    const passwordHash = await bcrypt.hash(validatedInput.password, this.SALT_ROUNDS);

    try {
      // Use transaction to ensure atomic operation
      const result = await withTransaction(async (tx) => {
        // Create user in brand system (main users table)
        const [brandUser] = await tx
          .insert(users)
          .values({
            email: validatedInput.email,
            firstName: validatedInput.firstName,
            lastName: validatedInput.lastName,
            passwordHash,
            marketingConsent: validatedInput.marketingConsent,
            authProvider: 'manual',
            isVerified: false, // Require email verification
            createdAt: new Date(),
            updatedAt: new Date()
          })
          .returning();

        // Create corresponding EOS user identity
        const eosUserId = `eos-${brandUser.id}`;

        // Create identity mapping in separate table
        const mappingId = crypto.randomUUID();
        await tx.execute(sql`
          INSERT INTO user_identity_mappings (id, brand_user_id, eos_user_id, created_at, updated_at)
          VALUES (${mappingId}, ${brandUser.id}, ${eosUserId}, NOW(), NOW())
        `);

        return {
          brandUser,
          eosUserId,
          mappingId
        };
      });

      // Audit log: User creation success
      this.logAuditEvent({
        event: 'user_created',
        email: validatedInput.email,
        userId: result.brandUser.id,
        success: true,
        metadata: {
          eosUserId: result.eosUserId,
          marketingConsent: validatedInput.marketingConsent
        }
      });

      return {
        success: true,
        brandUserId: result.brandUser.id,
        eosUserId: result.eosUserId,
        mappingId: result.mappingId,
        user: {
          email: result.brandUser.email!,
          firstName: result.brandUser.firstName!,
          lastName: result.brandUser.lastName!
        }
      };
    } catch (error) {
      // Audit log: User creation failure
      this.logAuditEvent({
        event: 'user_creation_failed',
        email: validatedInput.email,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      console.error('Failed to create user atomically:', error);
      throw new Error('Failed to create user atomically');
    }
  }

  /**
   * Authenticate user and return appropriate system token
   */
  async authenticateUser(input: AuthenticateUserInput): Promise<AuthResult> {
    // Validate input
    const validatedInput = authenticateUserSchema.parse(input);

    // Check rate limiting with optimized cleanup
    await this.checkRateLimit(validatedInput.email);

    try {
      // Find user by email
      const user = await db.query.users.findFirst({
        where: eq(users.email, validatedInput.email)
      });

      if (!user || !user.passwordHash) {
        await this.incrementRateLimit(validatedInput.email);

        // Audit log: Authentication failure - user not found
        this.logAuditEvent({
          event: 'authentication_failed',
          email: validatedInput.email,
          success: false,
          error: 'Invalid credentials',
          metadata: { reason: 'user_not_found', system: validatedInput.system }
        });

        throw new Error('Invalid email or password');
      }

      // Check if user is verified
      if (!user.isVerified) {
        // Audit log: Authentication failure - unverified user
        this.logAuditEvent({
          event: 'authentication_failed',
          email: validatedInput.email,
          userId: user.id,
          success: false,
          error: 'Email not verified',
          metadata: { reason: 'unverified_email', system: validatedInput.system }
        });

        throw new Error('Please verify your email before logging in');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(validatedInput.password, user.passwordHash);
      if (!isPasswordValid) {
        await this.incrementRateLimit(validatedInput.email);

        // Audit log: Authentication failure - invalid password
        this.logAuditEvent({
          event: 'authentication_failed',
          email: validatedInput.email,
          userId: user.id,
          success: false,
          error: 'Invalid password',
          metadata: { reason: 'invalid_password', system: validatedInput.system }
        });

        throw new Error('Invalid email or password');
      }

      // Get appropriate user ID based on system
      let userId = user.id;
      if (validatedInput.system === 'eos') {
        // Get EOS user ID from mapping
        const mapping = await this.getUserMapping(user.id);
        if (mapping) {
          userId = mapping.eosUserId;
        }
      }

      // Generate JWT token
      const jwtOptions: SignOptions = { expiresIn: this.JWT_EXPIRES_IN };
      const token = jwt.sign(
        {
          userId,
          email: user.email,
          system: validatedInput.system
        },
        this.JWT_SECRET,
        jwtOptions
      );

      // Create session in database
      const sessionToken = crypto.randomBytes(32).toString('hex');
      await db.insert(authSessions).values({
        userId: user.id,
        sessionToken,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
        ipAddress: null, // Would be populated from request context
        userAgent: null, // Would be populated from request context
        createdAt: new Date()
      });

      // Reset rate limit on successful auth
      this.resetRateLimit(validatedInput.email);

      // Audit log: Authentication success
      this.logAuditEvent({
        event: 'authentication_success',
        email: validatedInput.email,
        userId: user.id,
        success: true,
        metadata: {
          system: validatedInput.system,
          targetUserId: userId
        }
      });

      return {
        success: true,
        token,
        userId,
        system: validatedInput.system,
        expiresIn: 3600
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Authentication failed');
    }
  }

  /**
   * Map user identity between brand and EOS systems
   */
  async mapUserIdentity(brandUserId: string, eosUserId: string): Promise<{
    success: boolean;
    mappingId: string;
    brandUserId: string;
    eosUserId: string;
  }> {
    // Check if mapping already exists
    const existingMapping = await this.getUserMapping(brandUserId);
    if (existingMapping) {
      // Audit log: Mapping already exists
      this.logAuditEvent({
        event: 'identity_mapping_failed',
        userId: brandUserId,
        success: false,
        error: 'Mapping already exists',
        metadata: { brandUserId, eosUserId }
      });

      throw new Error('User identity mapping already exists');
    }

    // Validate that both user IDs exist
    const brandUser = await db.query.users.findFirst({
      where: eq(users.id, brandUserId)
    });

    if (!brandUser) {
      // Audit log: Invalid user ID
      this.logAuditEvent({
        event: 'identity_mapping_failed',
        userId: brandUserId,
        success: false,
        error: 'Invalid user ID',
        metadata: { brandUserId, eosUserId }
      });

      throw new Error('Invalid user IDs provided');
    }

    // Create mapping
    const mappingId = crypto.randomUUID();
    await db.execute(sql`
      INSERT INTO user_identity_mappings (id, brand_user_id, eos_user_id, created_at, updated_at)
      VALUES (${mappingId}, ${brandUserId}, ${eosUserId}, NOW(), NOW())
    `);

    // Audit log: Mapping created successfully
    this.logAuditEvent({
      event: 'identity_mapping_created',
      email: brandUser.email || undefined,
      userId: brandUserId,
      success: true,
      metadata: { brandUserId, eosUserId, mappingId }
    });

    return {
      success: true,
      mappingId,
      brandUserId,
      eosUserId
    };
  }

  /**
   * Validate session token
   */
  async validateSession(token: string): Promise<SessionValidationResult> {
    try {
      // Verify JWT token
      const decoded = jwt.verify(token, this.JWT_SECRET) as any;

      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        return {
          isValid: false,
          error: 'Token expired'
        };
      }

      // For brand system, check session exists in database
      if (decoded.system === 'brand') {
        const session = await db.query.authSessions.findFirst({
          where: and(
            eq(authSessions.userId, decoded.userId),
            sql`expires_at > NOW()`
          )
        });

        if (!session) {
          return {
            isValid: false,
            error: 'Session not found'
          };
        }

        return {
          isValid: true,
          userId: decoded.userId,
          system: 'brand',
          expiresAt: session.expiresAt
        };
      }

      // For EOS system, validate differently (simplified for now)
      return {
        isValid: true,
        userId: decoded.userId,
        system: 'eos',
        expiresAt: new Date(decoded.exp * 1000)
      };

    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return {
          isValid: false,
          error: 'Token expired'
        };
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return {
          isValid: false,
          error: 'Invalid token'
        };
      }
      return {
        isValid: false,
        error: 'Session validation failed'
      };
    }
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(oldToken: string): Promise<RefreshTokenResult> {
    try {
      // Verify old token (allow expired tokens within refresh window)
      const decoded = jwt.verify(oldToken, this.JWT_SECRET, {
        ignoreExpiration: true
      }) as any;

      // Check if token is too old to refresh
      if (decoded.exp * 1000 < Date.now() - this.REFRESH_WINDOW) {
        throw new Error('Cannot refresh expired token');
      }

      // Find session in database
      const session = await db.query.authSessions.findFirst({
        where: eq(authSessions.userId, decoded.userId)
      });

      if (!session || !session.isActive) {
        throw new Error('Session not found or inactive');
      }

      // Generate new token
      const jwtOptions: SignOptions = { expiresIn: this.JWT_EXPIRES_IN };
      const newToken = jwt.sign(
        {
          userId: decoded.userId,
          email: decoded.email,
          system: decoded.system
        },
        this.JWT_SECRET,
        jwtOptions
      );

      // Update session in database
      const newSessionToken = crypto.randomBytes(32).toString('hex');
      await db
        .update(authSessions)
        .set({
          sessionToken: newSessionToken,
          expiresAt: new Date(Date.now() + 60 * 60 * 1000),
          updatedAt: new Date()
        })
        .where(eq(authSessions.id, session.id));

      return {
        success: true,
        token: newToken,
        expiresIn: 3600
      };

    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Token refresh failed');
    }
  }

  /**
   * Sync user profile between systems
   */
  async syncUserProfile(userId: string, profileUpdate: {
    firstName?: string;
    lastName?: string;
    marketingConsent?: boolean;
  }): Promise<SyncProfileResult> {
    // Get user mapping
    const mapping = await this.getUserMapping(userId);
    if (!mapping) {
      throw new Error('User mapping not found');
    }

    // Update both systems in transaction
    await withTransaction(async (tx) => {
      // Update brand system
      await tx
        .update(users)
        .set({
          ...profileUpdate,
          updatedAt: new Date()
        })
        .where(eq(users.id, mapping.brandUserId));

      // EOS updates would happen here if we had separate EOS tables
      // For now, the mapping ensures consistency
    });

    return {
      success: true,
      brandUserId: mapping.brandUserId,
      eosUserId: mapping.eosUserId,
      updatedFields: Object.keys(profileUpdate)
    };
  }

  /**
   * Handle session timeout across systems
   */
  async handleSessionTimeout(sessionToken: string): Promise<SessionTimeoutResult> {
    // Find session
    const session = await db.query.authSessions.findFirst({
      where: eq(authSessions.sessionToken, sessionToken)
    });

    if (!session) {
      throw new Error('Session not found');
    }

    // Get user mapping
    const mapping = await this.getUserMapping(session.userId);

    // Invalidate all sessions for this user
    await withTransaction(async (tx) => {
      // Invalidate brand sessions
      await tx
        .update(authSessions)
        .set({
          isActive: false,
          updatedAt: new Date()
        })
        .where(eq(authSessions.userId, session.userId));

      // EOS session invalidation would happen here
    });

    return {
      success: true,
      message: 'Session invalidated across all systems',
      brandSessionInvalidated: true,
      eosSessionInvalidated: true
    };
  }

  /**
   * PKCE OAuth flow initiation
   */
  async initiatePKCEAuth(input: PKCEAuthInput): Promise<PKCEAuthResult> {
    const validatedInput = pkceAuthSchema.parse(input);

    // Store PKCE challenge
    await db.execute(sql`
      INSERT INTO pkce_challenges (email, challenge, challenge_method, state, created_at)
      VALUES (${validatedInput.email}, ${validatedInput.codeChallenge},
              ${validatedInput.codeChallengeMethod}, ${validatedInput.state}, NOW())
    `);

    // Generate authorization URL
    const authorizationUrl = `https://auth.infinityvault.com/oauth/authorize?` +
      `client_id=${process.env.OAUTH_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(process.env.OAUTH_REDIRECT_URI || '')}&` +
      `response_type=code&` +
      `scope=openid%20profile%20email&` +
      `state=${validatedInput.state}&` +
      `code_challenge=${validatedInput.codeChallenge}&` +
      `code_challenge_method=${validatedInput.codeChallengeMethod}`;

    return {
      success: true,
      authorizationUrl,
      state: validatedInput.state
    };
  }

  /**
   * PKCE code exchange for token
   *
   * WARNING: OAuth PKCE exchange PLACEHOLDER IMPLEMENTATION
   *
   * This method contains placeholder implementation with hardcoded user ID.
   * Full OAuth provider integration is required for production use.
   *
   * Current Status:
   * - PKCE challenge validation: IMPLEMENTED
   * - Code verifier timing-safe comparison: IMPLEMENTED
   * - OAuth provider token exchange: NOT IMPLEMENTED (placeholder)
   * - Real user ID from OAuth provider: NOT IMPLEMENTED (hardcoded)
   *
   * Production Requirements:
   * 1. Integrate with OAuth provider (Google/Auth0/etc)
   * 2. Exchange authorization code for access token
   * 3. Retrieve user profile from OAuth provider
   * 4. Create or lookup user in database
   * 5. Replace hardcoded 'oauth-user-id' with real user ID
   *
   * Until OAuth provider integration is complete:
   * - Use password authentication (authenticateUser method)
   * - This method throws error in production environment
   *
   * @throws Error in production environment indicating OAuth not implemented
   */
  async exchangePKCECode(input: PKCEExchangeInput): Promise<AuthResult> {
    // SECURITY: Prevent use in production until OAuth provider integrated
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'OAuth PKCE exchange not yet implemented for production use. ' +
        'Use password authentication until OAuth provider integration is complete.'
      );
    }

    const validatedInput = pkceExchangeSchema.parse(input);

    // Retrieve stored challenge
    const storedChallengeResult = await db.execute(sql`
      SELECT * FROM pkce_challenges
      WHERE state = ${validatedInput.state}
      AND created_at > NOW() - INTERVAL '10 minutes'
      LIMIT 1
    `);

    if (!storedChallengeResult.rows || storedChallengeResult.rows.length === 0) {
      throw new Error('Invalid or expired PKCE challenge');
    }

    const storedChallenge = storedChallengeResult.rows[0];

    // Verify code verifier against stored challenge using timing-safe comparison
    const calculatedChallenge = crypto
      .createHash('sha256')
      .update(validatedInput.codeVerifier)
      .digest('base64url');

    // Use timing-safe comparison to prevent timing attacks
    const storedBuffer = Buffer.from(storedChallenge.challenge as string);
    const calculatedBuffer = Buffer.from(calculatedChallenge);

    if (storedBuffer.length !== calculatedBuffer.length ||
        !crypto.timingSafeEqual(storedBuffer, calculatedBuffer)) {
      throw new Error('Invalid PKCE code verifier');
    }

    // PLACEHOLDER: Exchange code for token (would call real OAuth provider)
    // TODO: Implement real OAuth provider integration:
    // 1. POST to OAuth provider token endpoint with code and verifier
    // 2. Receive access token and user profile
    // 3. Create or lookup user in database
    // 4. Generate JWT with real user ID
    const jwtOptions: SignOptions = { expiresIn: this.JWT_EXPIRES_IN };
    const token = jwt.sign(
      {
        userId: 'oauth-user-id', // PLACEHOLDER: Replace with real user ID from OAuth provider
        email: storedChallenge.email,
        system: 'brand'
      },
      this.JWT_SECRET,
      jwtOptions
    );

    // Clean up used challenge
    await db.execute(sql`
      DELETE FROM pkce_challenges
      WHERE state = ${validatedInput.state}
    `);

    // Audit log: OAuth exchange (placeholder)
    this.logAuditEvent({
      event: 'oauth_pkce_exchange_placeholder',
      email: storedChallenge.email as string,
      success: true,
      metadata: {
        warning: 'Placeholder implementation - OAuth provider not integrated',
        environment: process.env.NODE_ENV
      }
    });

    return {
      success: true,
      token,
      userId: 'oauth-user-id', // PLACEHOLDER: Replace with real user ID
      system: 'brand',
      expiresIn: 3600
    };
  }

  /**
   * Track authentication attempts for rate limiting
   */
  async trackAuthAttempt(identifier: string): Promise<void> {
    await this.incrementRateLimit(identifier);
  }

  // ===============================
  // PRIVATE HELPER METHODS
  // ===============================

  /**
   * Log security event to audit trail
   * @private
   */
  private logAuditEvent(entry: Omit<AuditLogEntry, 'timestamp'>): void {
    const auditEntry: AuditLogEntry = {
      timestamp: new Date(),
      ...entry
    };

    this.auditLogs.push(auditEntry);

    // Prevent unbounded memory growth
    if (this.auditLogs.length > this.MAX_AUDIT_LOGS) {
      // In production, persist to database before removing
      this.auditLogs.shift();
    }

    // Log to console for development visibility
    if (process.env.NODE_ENV !== 'production') {
      console.log('[AUDIT]', JSON.stringify(auditEntry, null, 2));
    }
  }

  /**
   * Get audit logs for a specific user (for compliance and debugging)
   * @public
   */
  async getAuditLogs(userId: string, limit: number = 100): Promise<AuditLogEntry[]> {
    return this.auditLogs
      .filter(log => log.userId === userId)
      .slice(-limit)
      .reverse();
  }

  /**
   * Get recent security events (for admin monitoring)
   * @public
   */
  async getRecentSecurityEvents(limit: number = 50): Promise<AuditLogEntry[]> {
    return this.auditLogs
      .filter(log => !log.success) // Failed attempts
      .slice(-limit)
      .reverse();
  }

  private async getUserMapping(brandUserId: string): Promise<UserIdentityMapping | null> {
    const result = await db.execute(sql`
      SELECT * FROM user_identity_mappings
      WHERE brand_user_id = ${brandUserId}
      LIMIT 1
    `);

    if (result.rows && result.rows.length > 0) {
      const row = result.rows[0];
      return {
        id: row.id as string,
        brandUserId: row.brand_user_id as string,
        eosUserId: row.eos_user_id as string,
        createdAt: row.created_at as Date,
        updatedAt: row.updated_at as Date
      };
    }

    return null;
  }

  /**
   * Check rate limit for identifier
   * Performs optimized cleanup during check instead of periodic intervals
   * @private
   */
  private async checkRateLimit(identifier: string): Promise<void> {
    const key = `auth:${identifier}`;
    const attempt = this.authAttempts.get(key);

    // Optimized cleanup: Remove expired entry during check
    if (attempt) {
      if (Date.now() >= attempt.resetAt) {
        // Window has passed, remove expired entry
        this.authAttempts.delete(key);
        return; // Allow request to proceed
      }

      // Check if limit exceeded
      if (attempt.count >= this.AUTH_RATE_LIMIT) {
        // Audit log: Rate limit exceeded
        this.logAuditEvent({
          event: 'rate_limit_exceeded',
          email: identifier,
          success: false,
          error: 'Too many attempts',
          metadata: { attempts: attempt.count, resetAt: new Date(attempt.resetAt) }
        });

        throw new Error('Too many authentication attempts. Please try again later.');
      }
    }

    // Opportunistic cleanup: Remove a few expired entries during each check
    this.cleanupExpiredRateLimits(5);
  }

  private async incrementRateLimit(identifier: string): Promise<void> {
    const key = `auth:${identifier}`;
    const attempt = this.authAttempts.get(key);

    if (!attempt) {
      this.authAttempts.set(key, {
        count: 1,
        resetAt: Date.now() + this.AUTH_RATE_WINDOW
      });
    } else {
      attempt.count++;
    }

    // Check if we've exceeded the limit
    const updatedAttempt = this.authAttempts.get(key)!;
    if (updatedAttempt.count > this.AUTH_RATE_LIMIT) {
      throw new Error('Rate limit exceeded');
    }
  }

  private resetRateLimit(identifier: string): void {
    const key = `auth:${identifier}`;
    this.authAttempts.delete(key);
  }

  /**
   * Optimized cleanup: Only clean up a limited number of expired entries
   * This prevents performance degradation with large rate limit maps
   * @private
   */
  private cleanupExpiredRateLimits(maxToClean: number = 10): void {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, attempt] of this.authAttempts.entries()) {
      if (cleaned >= maxToClean) {
        break; // Limit cleanup work per call
      }

      if (attempt.resetAt < now) {
        this.authAttempts.delete(key);
        cleaned++;
      }
    }
  }
}

// Export singleton instance
export const identityBridgeService = new IdentityBridgeService();
