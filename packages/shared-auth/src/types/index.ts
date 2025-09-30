import { z } from 'zod';

/**
 * Core authentication types and schemas for shared authentication service
 */

// Base user interface
export interface BaseUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  role: 'customer' | 'admin' | 'moderator';
  authProvider: 'google' | 'manual' | 'sso';
  passwordHash?: string;
  birthday?: Date;
  marketingConsent?: boolean;
}

// Authentication session interface
export interface AuthSession {
  id: string;
  userId: string;
  sessionToken: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;
  userAgent?: string;
  isActive: boolean;
  rememberMeToken?: string;
  rememberMeExpiresAt?: Date;
}

// Remember me token interface
export interface RememberMeToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
  lastUsedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
  series: string; // For token rotation
  isActive: boolean;
}

// OAuth state parameters
export interface OAuthStateParams {
  claimId?: string;
  returnTo?: string;
  rememberMe?: boolean;
  createAccount?: boolean;
  prizeInfo?: string;
  timestamp: number;
  nonce: string;
}

// Google OAuth user info
export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
}

// Authentication result
export interface AuthResult<T = BaseUser> {
  success: boolean;
  user?: T;
  session?: AuthSession;
  error?: string;
  requiresVerification?: boolean;
  rememberMeToken?: string;
}

// Session validation result
export interface SessionValidationResult {
  isValid: boolean;
  user?: BaseUser;
  session?: AuthSession;
  userId?: string;
  expiresAt?: Date;
  shouldRefresh?: boolean;
  timeRemaining?: number;
  error?: string;
}

// Rate limiting interface
export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxAttempts: number; // Maximum attempts per window
  blockDurationMs: number; // Block duration after exceeding limit
}

// Security configuration
export interface SecurityConfig {
  oauth: {
    stateSecret: string;
    scopes: string[];
    includeRefreshToken: boolean;
  };
  session: {
    cookieName: string;
    cookieSecure: boolean;
    cookieHttpOnly: boolean;
    cookieSameSite: 'strict' | 'lax' | 'none';
    defaultExpiryDays: number;
    rememberMeExpiryDays: number;
  };
  rememberMe: {
    enabled: boolean;
    tokenLength: number;
    rotateOnUse: boolean;
    maxTokensPerUser: number;
  };
  rateLimiting: {
    auth: RateLimitConfig;
    oauth: RateLimitConfig;
    session: RateLimitConfig;
  };
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
}

// Database connection context
export interface DatabaseContext {
  type: 'website' | 'eos';
  connectionString?: string;
  poolConfig?: any;
}

// Authentication context for requests
export interface AuthContext {
  user?: BaseUser;
  session?: AuthSession;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
}

// Validation schemas using Zod
export const OAuthStateParamsSchema = z.object({
  claimId: z.string().optional(),
  returnTo: z.string().optional(),
  rememberMe: z.boolean().optional(),
  createAccount: z.boolean().optional(),
  prizeInfo: z.string().optional(),
  timestamp: z.number(),
  nonce: z.string()
});

export const GoogleUserInfoSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  verified_email: z.boolean(),
  name: z.string().optional(),
  given_name: z.string().optional(),
  family_name: z.string().optional(),
  picture: z.string().url().optional(),
  locale: z.string().optional()
});

export const SessionValidationResultSchema = z.object({
  isValid: z.boolean(),
  userId: z.string().optional(),
  expiresAt: z.date().optional(),
  shouldRefresh: z.boolean().optional(),
  error: z.string().optional()
});

export const AuthContextSchema = z.object({
  user: z.any().optional(), // Will be typed by system-specific implementations
  session: z.any().optional(), // Will be typed by system-specific implementations
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  requestId: z.string().optional()
});

// Login request schema
export const LoginRequestSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false)
});

// Registration request schema
export const RegistrationRequestSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  birthday: z.string().optional(),
  marketingConsent: z.boolean().optional().default(false)
});

// OAuth callback request schema
export const OAuthCallbackSchema = z.object({
  code: z.string(),
  state: z.string(),
  error: z.string().optional()
});

// Session creation options
export const SessionOptionsSchema = z.object({
  rememberMe: z.boolean().optional().default(false),
  isGoogleAuth: z.boolean().optional().default(false),
  extendedSession: z.boolean().optional().default(false)
});

// Type exports for convenience
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RegistrationRequest = z.infer<typeof RegistrationRequestSchema>;
export type OAuthCallback = z.infer<typeof OAuthCallbackSchema>;
export type SessionOptions = z.infer<typeof SessionOptionsSchema>;

// Error types
export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export class SessionError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 401
  ) {
    super(message);
    this.name = 'SessionError';
  }
}

export class SecurityError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 403
  ) {
    super(message);
    this.name = 'SecurityError';
  }
}

export class RateLimitError extends Error {
  constructor(
    message: string,
    public retryAfter: number,
    public statusCode: number = 429
  ) {
    super(message);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

export class NotFoundError extends AuthError {
  constructor(resource: string, identifier: string) {
    super(`${resource} not found: ${identifier}`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AuthError {
  constructor(resource: string, field: string, value: string) {
    super(`${resource} already exists with ${field}: ${value}`, 'CONFLICT', 409);
    this.name = 'ConflictError';
  }
}

export class ValidationError extends AuthError {
  constructor(message: string, public field?: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}