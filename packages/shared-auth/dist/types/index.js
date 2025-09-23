"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.ConflictError = exports.NotFoundError = exports.RateLimitError = exports.SecurityError = exports.SessionError = exports.AuthError = exports.SessionOptionsSchema = exports.OAuthCallbackSchema = exports.RegistrationRequestSchema = exports.LoginRequestSchema = exports.AuthContextSchema = exports.SessionValidationResultSchema = exports.GoogleUserInfoSchema = exports.OAuthStateParamsSchema = void 0;
const zod_1 = require("zod");
// Validation schemas using Zod
exports.OAuthStateParamsSchema = zod_1.z.object({
    claimId: zod_1.z.string().optional(),
    returnTo: zod_1.z.string().optional(),
    rememberMe: zod_1.z.boolean().optional(),
    createAccount: zod_1.z.boolean().optional(),
    prizeInfo: zod_1.z.string().optional(),
    timestamp: zod_1.z.number(),
    nonce: zod_1.z.string()
});
exports.GoogleUserInfoSchema = zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string().email(),
    verified_email: zod_1.z.boolean(),
    name: zod_1.z.string().optional(),
    given_name: zod_1.z.string().optional(),
    family_name: zod_1.z.string().optional(),
    picture: zod_1.z.string().url().optional(),
    locale: zod_1.z.string().optional()
});
exports.SessionValidationResultSchema = zod_1.z.object({
    isValid: zod_1.z.boolean(),
    userId: zod_1.z.string().optional(),
    expiresAt: zod_1.z.date().optional(),
    shouldRefresh: zod_1.z.boolean().optional(),
    error: zod_1.z.string().optional()
});
exports.AuthContextSchema = zod_1.z.object({
    user: zod_1.z.any().optional(), // Will be typed by system-specific implementations
    session: zod_1.z.any().optional(), // Will be typed by system-specific implementations
    ipAddress: zod_1.z.string().optional(),
    userAgent: zod_1.z.string().optional(),
    requestId: zod_1.z.string().optional()
});
// Login request schema
exports.LoginRequestSchema = zod_1.z.object({
    email: zod_1.z.string().email('Please enter a valid email address'),
    password: zod_1.z.string().min(1, 'Password is required'),
    rememberMe: zod_1.z.boolean().optional().default(false)
});
// Registration request schema
exports.RegistrationRequestSchema = zod_1.z.object({
    email: zod_1.z.string().email('Please enter a valid email address'),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters long'),
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
    birthday: zod_1.z.string().optional(),
    marketingConsent: zod_1.z.boolean().optional().default(false)
});
// OAuth callback request schema
exports.OAuthCallbackSchema = zod_1.z.object({
    code: zod_1.z.string(),
    state: zod_1.z.string(),
    error: zod_1.z.string().optional()
});
// Session creation options
exports.SessionOptionsSchema = zod_1.z.object({
    rememberMe: zod_1.z.boolean().optional().default(false),
    isGoogleAuth: zod_1.z.boolean().optional().default(false),
    extendedSession: zod_1.z.boolean().optional().default(false)
});
// Error types
class AuthError extends Error {
    constructor(message, code, statusCode = 400) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.name = 'AuthError';
    }
}
exports.AuthError = AuthError;
class SessionError extends Error {
    constructor(message, code, statusCode = 401) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.name = 'SessionError';
    }
}
exports.SessionError = SessionError;
class SecurityError extends Error {
    constructor(message, code, statusCode = 403) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.name = 'SecurityError';
    }
}
exports.SecurityError = SecurityError;
class RateLimitError extends Error {
    constructor(message, retryAfter, statusCode = 429) {
        super(message);
        this.retryAfter = retryAfter;
        this.statusCode = statusCode;
        this.name = 'RateLimitError';
        this.retryAfter = retryAfter;
    }
}
exports.RateLimitError = RateLimitError;
class NotFoundError extends AuthError {
    constructor(resource, identifier) {
        super(`${resource} not found: ${identifier}`, 'NOT_FOUND', 404);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends AuthError {
    constructor(resource, field, value) {
        super(`${resource} already exists with ${field}: ${value}`, 'CONFLICT', 409);
        this.name = 'ConflictError';
    }
}
exports.ConflictError = ConflictError;
class ValidationError extends AuthError {
    constructor(message, field) {
        super(message, 'VALIDATION_ERROR', 400);
        this.field = field;
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=index.js.map