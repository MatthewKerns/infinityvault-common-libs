/**
 * @infinityvault/shared-auth - Shared authentication services
 *
 * Provides consistent authentication behavior across website and EOS systems
 * with enhanced security features including PKCE, rate limiting, and session management.
 */

// Core authentication types and interfaces
export * from './types';

// Repository interfaces and abstractions
export * from './repositories';

// Security utilities and validators
export * from './security';

// Core authentication service
export { AuthCore } from './core';

// Authentication services
export { GoogleOAuthService, createGoogleOAuthService } from './services/GoogleOAuthService';
export { SessionManager } from './services/SessionManager';
export { RememberMeService } from './services/RememberMeService';

// Website-specific repository implementations
export {
  WebsiteUserRepository,
  createWebsiteUserRepository,
  WebsiteSessionRepository,
  createWebsiteSessionRepository,
  WebsiteRememberMeRepository,
  createWebsiteRememberMeRepository
} from './adapters/website';

// Re-export commonly used types for convenience
export type {
  BaseUser,
  AuthSession,
  RememberMeToken,
  AuthResult,
  SessionValidationResult,
  LoginRequest,
  RegistrationRequest,
  SessionOptions,
  SecurityConfig,
  GoogleUserInfo,
  OAuthStateParams
} from './types';

export type {
  IUserRepository,
  ISessionRepository,
  IRememberMeRepository,
  IRateLimitRepository,
  IAuditRepository,
  IAuthRepositories,
  IRepositoryFactory
} from './repositories';

// Version info
export const version = '1.0.0';
export const name = '@infinityvault/shared-auth';