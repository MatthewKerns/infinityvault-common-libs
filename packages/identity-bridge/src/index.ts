/**
 * @infinityvault/identity-bridge
 *
 * Unified identity bridge service for cross-system authentication
 * between InfinityVault Brand Website and EOS Agent.
 *
 * Production-Ready Features:
 * - Password-based authentication (createUser, authenticateUser)
 * - Session management and token refresh
 * - Profile synchronization across systems
 * - Rate limiting and security controls
 * - Comprehensive audit logging
 *
 * In Development:
 * - OAuth PKCE flow (validation ready, provider integration pending)
 *   WARNING: exchangePKCECode throws error in production until OAuth provider integrated
 *
 * Security Features:
 * - PKCE OAuth framework with S256 code challenge
 * - State validation with timing-safe comparison
 * - Rate limiting: 20 auth attempts per 15 minutes
 * - HttpOnly, Secure, SameSite=strict cookies
 * - JWT tokens with 1-hour expiration
 * - Bcrypt password hashing with 10 salt rounds
 *
 * Environment Variables (REQUIRED):
 * - JWT_SECRET: Secure random string (min 32 characters)
 * - DATABASE_URL: PostgreSQL connection string
 * - NODE_ENV: development|production
 *
 * @packageDocumentation
 */

export { IdentityBridgeService, identityBridgeService } from './identity-bridge.service.js';
export type {
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
export {
  createUserSchema,
  authenticateUserSchema,
  pkceAuthSchema,
  pkceExchangeSchema
} from './types.js';
