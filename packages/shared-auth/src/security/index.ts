import crypto from 'crypto';
import { z } from 'zod';
import {
  SecurityConfig,
  RateLimitConfig,
  SecurityError,
  RateLimitError,
  OAuthStateParams,
  OAuthStateParamsSchema
} from '../types';
import { IRateLimitRepository, IAuditRepository } from '../repositories';

/**
 * Security validation and enforcement for authentication operations
 */

// PKCE (Proof Key for Code Exchange) utilities
export class PKCEUtil {
  /**
   * Generate code verifier for PKCE flow
   */
  static generateCodeVerifier(): string {
    return crypto.randomBytes(32).toString('base64url');
  }

  /**
   * Generate code challenge from verifier
   */
  static generateCodeChallenge(verifier: string): string {
    return crypto.createHash('sha256').update(verifier).digest('base64url');
  }

  /**
   * Verify code challenge matches verifier
   */
  static verifyCodeChallenge(challenge: string, verifier: string): boolean {
    const expectedChallenge = this.generateCodeChallenge(verifier);
    return challenge === expectedChallenge;
  }
}

// OAuth state management with enhanced security
export class OAuthStateManager {
  private stateSecret: string;

  constructor(stateSecret: string) {
    this.stateSecret = stateSecret;
  }

  /**
   * Generate secure state parameter with HMAC signature
   */
  generateState(params: Omit<OAuthStateParams, 'timestamp' | 'nonce'>): string {
    const stateData: OAuthStateParams = {
      ...params,
      timestamp: Date.now(),
      nonce: crypto.randomBytes(16).toString('hex')
    };

    // Validate state data
    const validationResult = OAuthStateParamsSchema.safeParse(stateData);
    if (!validationResult.success) {
      throw new SecurityError('Invalid state parameters', 'INVALID_STATE_PARAMS');
    }

    const stateString = Buffer.from(JSON.stringify(stateData)).toString('base64');
    const signature = crypto
      .createHmac('sha256', this.stateSecret)
      .update(stateString)
      .digest('hex');

    return `${stateString}.${signature}`;
  }

  /**
   * Verify and parse state parameter
   */
  verifyAndParseState(state: string): OAuthStateParams | null {
    try {
      const [stateString, signature] = state.split('.');
      if (!stateString || !signature) {
        return null;
      }

      // Verify HMAC signature
      const expectedSignature = crypto
        .createHmac('sha256', this.stateSecret)
        .update(stateString)
        .digest('hex');

      if (!crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expectedSignature, 'hex'))) {
        return null;
      }

      // Parse and validate state data
      const stateData = JSON.parse(Buffer.from(stateString, 'base64').toString());
      const validationResult = OAuthStateParamsSchema.safeParse(stateData);
      if (!validationResult.success) {
        return null;
      }

      // Check if state is expired (5 minutes max)
      const maxAge = 5 * 60 * 1000; // 5 minutes
      if (Date.now() - stateData.timestamp > maxAge) {
        return null;
      }

      return stateData;
    } catch {
      return null;
    }
  }
}

// Rate limiting enforcement
export class RateLimiter {
  private rateLimitRepo: IRateLimitRepository;
  private auditRepo?: IAuditRepository;

  constructor(rateLimitRepo: IRateLimitRepository, auditRepo?: IAuditRepository) {
    this.rateLimitRepo = rateLimitRepo;
    this.auditRepo = auditRepo;
  }

  /**
   * Check and enforce rate limit for an action
   */
  async checkRateLimit(
    key: string,
    config: RateLimitConfig,
    context?: {
      userId?: string;
      ipAddress?: string;
      action: string;
    }
  ): Promise<{
    allowed: boolean;
    remaining: number;
    retryAfter?: number;
  }> {
    try {
      // Check if key is currently blocked
      const isBlocked = await this.rateLimitRepo.isBlocked(key);
      if (isBlocked) {
        const retryAfter = Math.ceil(config.blockDurationMs / 1000);

        // Log security event
        if (this.auditRepo && context) {
          await this.auditRepo.logSecurityEvent({
            userId: context.userId,
            eventType: 'RATE_LIMIT_BLOCKED',
            severity: 'medium',
            description: `Rate limit blocked for action: ${context.action}`,
            ipAddress: context.ipAddress,
            metadata: { key, action: context.action, retryAfter }
          });
        }

        return {
          allowed: false,
          remaining: 0,
          retryAfter
        };
      }

      // Get current attempt count
      const currentAttempts = await this.rateLimitRepo.getAttemptCount(key, config.windowMs);

      if (currentAttempts >= config.maxAttempts) {
        // Block the key for the specified duration
        await this.rateLimitRepo.blockKey(key, config.blockDurationMs);

        const retryAfter = Math.ceil(config.blockDurationMs / 1000);

        // Log security event
        if (this.auditRepo && context) {
          await this.auditRepo.logSecurityEvent({
            userId: context.userId,
            eventType: 'RATE_LIMIT_EXCEEDED',
            severity: 'high',
            description: `Rate limit exceeded for action: ${context.action}`,
            ipAddress: context.ipAddress,
            metadata: {
              key,
              action: context.action,
              attempts: currentAttempts,
              maxAttempts: config.maxAttempts,
              retryAfter
            }
          });
        }

        throw new RateLimitError(
          `Rate limit exceeded. Too many attempts for ${context?.action || 'this action'}`,
          retryAfter
        );
      }

      // Increment attempt count
      const newAttempts = await this.rateLimitRepo.incrementAttempts(key, config.windowMs);
      const remaining = Math.max(0, config.maxAttempts - newAttempts);

      return {
        allowed: true,
        remaining
      };
    } catch (error) {
      if (error instanceof RateLimitError) {
        throw error;
      }

      // Log unexpected error but allow the operation (fail open)
      console.error('Rate limiting error:', error);
      return {
        allowed: true,
        remaining: config.maxAttempts
      };
    }
  }

  /**
   * Check IP-based rate limit
   */
  async checkIPRateLimit(
    ipAddress: string,
    action: string,
    config: RateLimitConfig
  ): Promise<void> {
    const key = `ip:${ipAddress}:${action}`;
    const result = await this.checkRateLimit(key, config, {
      ipAddress,
      action
    });

    if (!result.allowed) {
      throw new RateLimitError(
        `Too many ${action} attempts from this IP address`,
        result.retryAfter || Math.ceil(config.blockDurationMs / 1000)
      );
    }
  }

  /**
   * Check user-based rate limit
   */
  async checkUserRateLimit(
    userId: string,
    action: string,
    config: RateLimitConfig,
    ipAddress?: string
  ): Promise<void> {
    const key = `user:${userId}:${action}`;
    const result = await this.checkRateLimit(key, config, {
      userId,
      ipAddress,
      action
    });

    if (!result.allowed) {
      throw new RateLimitError(
        `Too many ${action} attempts for this user`,
        result.retryAfter || Math.ceil(config.blockDurationMs / 1000)
      );
    }
  }

  /**
   * Reset rate limit for a key (for successful operations)
   */
  async resetRateLimit(key: string): Promise<void> {
    await this.rateLimitRepo.resetAttempts(key);
  }
}

// Password security utilities
export class PasswordSecurity {
  private static readonly SALT_ROUNDS = 12;

  /**
   * Hash password with bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    const bcrypt = await import('bcrypt');
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Compare password with hash
   */
  static async comparePassword(password: string, hash: string): Promise<boolean> {
    const bcrypt = await import('bcrypt');
    return bcrypt.compare(password, hash);
  }

  /**
   * Validate password against security policy
   */
  static validatePassword(password: string, policy: SecurityConfig['passwordPolicy']): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < policy.minLength) {
      errors.push(`Password must be at least ${policy.minLength} characters long`);
    }

    if (policy.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (policy.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (policy.requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (policy.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Generate secure random password
   */
  static generateSecurePassword(length: number = 16): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';

    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return password;
  }
}

// Session security utilities
export class SessionSecurity {
  /**
   * Generate cryptographically secure session token
   */
  static generateSessionToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Generate secure remember me token
   */
  static generateRememberMeToken(): {
    token: string;
    hash: string;
    series: string;
  } {
    const token = crypto.randomBytes(32).toString('hex');
    const series = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha256').update(token).digest('hex');

    return { token, hash, series };
  }

  /**
   * Verify remember me token
   */
  static verifyRememberMeToken(token: string, hash: string): boolean {
    const computedHash = crypto.createHash('sha256').update(token).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(computedHash, 'hex'));
  }

  /**
   * Generate secure nonce for CSRF protection
   */
  static generateNonce(): string {
    return crypto.randomBytes(16).toString('base64');
  }

  /**
   * Validate session timing to detect suspicious activity
   */
  static validateSessionTiming(
    lastActivity: Date,
    currentTime: Date = new Date(),
    maxIdleTimeMs: number = 30 * 60 * 1000 // 30 minutes
  ): {
    isValid: boolean;
    shouldRefresh: boolean;
    timeRemaining: number;
  } {
    const timeSinceActivity = currentTime.getTime() - lastActivity.getTime();
    const isValid = timeSinceActivity <= maxIdleTimeMs;
    const shouldRefresh = timeSinceActivity > (maxIdleTimeMs * 0.8); // Refresh at 80% of max idle time
    const timeRemaining = Math.max(0, maxIdleTimeMs - timeSinceActivity);

    return {
      isValid,
      shouldRefresh,
      timeRemaining
    };
  }
}

// Main security validator class
export class SecurityValidator {
  private config: SecurityConfig;
  private rateLimiter: RateLimiter;
  private stateManager: OAuthStateManager;
  private auditRepo?: IAuditRepository;

  constructor(
    config: SecurityConfig,
    rateLimitRepo: IRateLimitRepository,
    auditRepo?: IAuditRepository
  ) {
    this.config = config;
    this.rateLimiter = new RateLimiter(rateLimitRepo, auditRepo);
    this.stateManager = new OAuthStateManager(config.oauth.stateSecret);
    this.auditRepo = auditRepo;
  }

  /**
   * Validate authentication request
   */
  async validateAuthRequest(
    request: {
      email?: string;
      password?: string;
      rememberMe?: boolean;
    },
    context: {
      ipAddress?: string;
      userAgent?: string;
      requestId?: string;
    }
  ): Promise<void> {
    // IP-based rate limiting for authentication attempts
    if (context.ipAddress) {
      await this.rateLimiter.checkIPRateLimit(
        context.ipAddress,
        'auth_attempt',
        this.config.rateLimiting.auth
      );
    }

    // Email-based rate limiting if provided
    if (request.email) {
      await this.rateLimiter.checkUserRateLimit(
        request.email,
        'auth_attempt',
        this.config.rateLimiting.auth,
        context.ipAddress
      );
    }

    // Validate password if provided
    if (request.password) {
      const passwordValidation = PasswordSecurity.validatePassword(
        request.password,
        this.config.passwordPolicy
      );

      if (!passwordValidation.isValid) {
        throw new SecurityError(
          `Password does not meet security requirements: ${passwordValidation.errors.join(', ')}`,
          'WEAK_PASSWORD'
        );
      }
    }
  }

  /**
   * Validate OAuth flow
   */
  async validateOAuthFlow(
    request: {
      state?: string;
      code?: string;
      codeVerifier?: string;
      codeChallenge?: string;
    },
    context: {
      ipAddress?: string;
      userAgent?: string;
    }
  ): Promise<OAuthStateParams | null> {
    // IP-based rate limiting for OAuth attempts
    if (context.ipAddress) {
      await this.rateLimiter.checkIPRateLimit(
        context.ipAddress,
        'oauth_attempt',
        this.config.rateLimiting.oauth
      );
    }

    // Validate state parameter
    if (!request.state) {
      throw new SecurityError('Missing state parameter', 'MISSING_STATE');
    }

    const stateData = this.stateManager.verifyAndParseState(request.state);
    if (!stateData) {
      throw new SecurityError('Invalid or expired state parameter', 'INVALID_STATE');
    }

    // Validate PKCE if provided
    if (request.codeChallenge && request.codeVerifier) {
      const isValidPKCE = PKCEUtil.verifyCodeChallenge(
        request.codeChallenge,
        request.codeVerifier
      );

      if (!isValidPKCE) {
        throw new SecurityError('Invalid PKCE verification', 'INVALID_PKCE');
      }
    }

    return stateData;
  }

  /**
   * Validate session request
   */
  async validateSessionRequest(
    sessionToken: string,
    context: {
      ipAddress?: string;
      userAgent?: string;
      userId?: string;
    }
  ): Promise<void> {
    // IP-based rate limiting for session validation
    if (context.ipAddress) {
      await this.rateLimiter.checkIPRateLimit(
        context.ipAddress,
        'session_check',
        this.config.rateLimiting.session
      );
    }

    // Basic session token validation
    if (!sessionToken || sessionToken.length < 32) {
      throw new SecurityError('Invalid session token format', 'INVALID_SESSION_TOKEN');
    }
  }

  /**
   * Log security event
   */
  async logSecurityEvent(
    eventType: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    description: string,
    context: {
      userId?: string;
      ipAddress?: string;
      userAgent?: string;
      metadata?: any;
    }
  ): Promise<void> {
    if (this.auditRepo) {
      await this.auditRepo.logSecurityEvent({
        userId: context.userId,
        eventType,
        severity,
        description,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
        metadata: context.metadata
      });
    }
  }

  /**
   * Generate OAuth state
   */
  generateOAuthState(params: Omit<OAuthStateParams, 'timestamp' | 'nonce'>): string {
    return this.stateManager.generateState(params);
  }

  /**
   * Generate PKCE pair
   */
  generatePKCE(): { verifier: string; challenge: string } {
    const verifier = PKCEUtil.generateCodeVerifier();
    const challenge = PKCEUtil.generateCodeChallenge(verifier);
    return { verifier, challenge };
  }

  /**
   * Reset rate limit after successful operation
   */
  async resetRateLimit(key: string): Promise<void> {
    await this.rateLimiter.resetRateLimit(key);
  }
}

// Classes are already exported above with 'export class' declarations