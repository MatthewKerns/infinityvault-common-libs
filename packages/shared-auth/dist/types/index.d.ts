import { z } from 'zod';
/**
 * Core authentication types and schemas for shared authentication service
 */
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
export interface RememberMeToken {
    id: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date;
    createdAt: Date;
    lastUsedAt?: Date;
    ipAddress?: string;
    userAgent?: string;
    series: string;
    isActive: boolean;
}
export interface OAuthStateParams {
    claimId?: string;
    returnTo?: string;
    rememberMe?: boolean;
    createAccount?: boolean;
    prizeInfo?: string;
    timestamp: number;
    nonce: string;
}
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
export interface AuthResult<T = BaseUser> {
    success: boolean;
    user?: T;
    session?: AuthSession;
    error?: string;
    requiresVerification?: boolean;
    rememberMeToken?: string;
}
export interface SessionValidationResult {
    success: boolean;
    isValid: boolean;
    user?: BaseUser;
    session?: AuthSession;
    userId?: string;
    expiresAt?: Date;
    shouldRefresh?: boolean;
    timeRemaining?: number;
    error?: string;
}
export interface RateLimitConfig {
    windowMs: number;
    maxAttempts: number;
    blockDurationMs: number;
}
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
export interface DatabaseContext {
    type: 'website' | 'eos';
    connectionString?: string;
    poolConfig?: any;
}
export interface AuthContext {
    user?: BaseUser;
    session?: AuthSession;
    ipAddress?: string;
    userAgent?: string;
    requestId?: string;
}
export declare const OAuthStateParamsSchema: z.ZodObject<{
    claimId: z.ZodOptional<z.ZodString>;
    returnTo: z.ZodOptional<z.ZodString>;
    rememberMe: z.ZodOptional<z.ZodBoolean>;
    createAccount: z.ZodOptional<z.ZodBoolean>;
    prizeInfo: z.ZodOptional<z.ZodString>;
    timestamp: z.ZodNumber;
    nonce: z.ZodString;
}, "strip", z.ZodTypeAny, {
    timestamp: number;
    nonce: string;
    claimId?: string | undefined;
    returnTo?: string | undefined;
    rememberMe?: boolean | undefined;
    createAccount?: boolean | undefined;
    prizeInfo?: string | undefined;
}, {
    timestamp: number;
    nonce: string;
    claimId?: string | undefined;
    returnTo?: string | undefined;
    rememberMe?: boolean | undefined;
    createAccount?: boolean | undefined;
    prizeInfo?: string | undefined;
}>;
export declare const GoogleUserInfoSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    verified_email: z.ZodBoolean;
    name: z.ZodOptional<z.ZodString>;
    given_name: z.ZodOptional<z.ZodString>;
    family_name: z.ZodOptional<z.ZodString>;
    picture: z.ZodOptional<z.ZodString>;
    locale: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    verified_email: boolean;
    name?: string | undefined;
    given_name?: string | undefined;
    family_name?: string | undefined;
    picture?: string | undefined;
    locale?: string | undefined;
}, {
    id: string;
    email: string;
    verified_email: boolean;
    name?: string | undefined;
    given_name?: string | undefined;
    family_name?: string | undefined;
    picture?: string | undefined;
    locale?: string | undefined;
}>;
export declare const SessionValidationResultSchema: z.ZodObject<{
    isValid: z.ZodBoolean;
    userId: z.ZodOptional<z.ZodString>;
    expiresAt: z.ZodOptional<z.ZodDate>;
    shouldRefresh: z.ZodOptional<z.ZodBoolean>;
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    isValid: boolean;
    userId?: string | undefined;
    expiresAt?: Date | undefined;
    shouldRefresh?: boolean | undefined;
    error?: string | undefined;
}, {
    isValid: boolean;
    userId?: string | undefined;
    expiresAt?: Date | undefined;
    shouldRefresh?: boolean | undefined;
    error?: string | undefined;
}>;
export declare const AuthContextSchema: z.ZodObject<{
    user: z.ZodOptional<z.ZodAny>;
    session: z.ZodOptional<z.ZodAny>;
    ipAddress: z.ZodOptional<z.ZodString>;
    userAgent: z.ZodOptional<z.ZodString>;
    requestId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    user?: any;
    session?: any;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
    requestId?: string | undefined;
}, {
    user?: any;
    session?: any;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
    requestId?: string | undefined;
}>;
export declare const LoginRequestSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    rememberMe: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    rememberMe: boolean;
    email: string;
    password: string;
}, {
    email: string;
    password: string;
    rememberMe?: boolean | undefined;
}>;
export declare const RegistrationRequestSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    birthday: z.ZodOptional<z.ZodString>;
    marketingConsent: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    marketingConsent: boolean;
    birthday?: string | undefined;
}, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthday?: string | undefined;
    marketingConsent?: boolean | undefined;
}>;
export declare const OAuthCallbackSchema: z.ZodObject<{
    code: z.ZodString;
    state: z.ZodString;
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: string;
    state: string;
    error?: string | undefined;
}, {
    code: string;
    state: string;
    error?: string | undefined;
}>;
export declare const SessionOptionsSchema: z.ZodObject<{
    rememberMe: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    isGoogleAuth: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    extendedSession: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    rememberMe: boolean;
    isGoogleAuth: boolean;
    extendedSession: boolean;
}, {
    rememberMe?: boolean | undefined;
    isGoogleAuth?: boolean | undefined;
    extendedSession?: boolean | undefined;
}>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RegistrationRequest = z.infer<typeof RegistrationRequestSchema>;
export type OAuthCallback = z.infer<typeof OAuthCallbackSchema>;
export type SessionOptions = z.infer<typeof SessionOptionsSchema>;
export declare class AuthError extends Error {
    code: string;
    statusCode: number;
    constructor(message: string, code: string, statusCode?: number);
}
export declare class SessionError extends Error {
    code: string;
    statusCode: number;
    constructor(message: string, code: string, statusCode?: number);
}
export declare class SecurityError extends Error {
    code: string;
    statusCode: number;
    constructor(message: string, code: string, statusCode?: number);
}
export declare class RateLimitError extends Error {
    retryAfter: number;
    statusCode: number;
    constructor(message: string, retryAfter: number, statusCode?: number);
}
export declare class NotFoundError extends AuthError {
    constructor(resource: string, identifier: string);
}
export declare class ConflictError extends AuthError {
    constructor(resource: string, field: string, value: string);
}
export declare class ValidationError extends AuthError {
    field?: string | undefined;
    constructor(message: string, field?: string | undefined);
}
//# sourceMappingURL=index.d.ts.map