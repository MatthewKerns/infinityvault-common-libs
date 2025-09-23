/**
 * @infinityvault/shared-auth - Shared authentication services
 *
 * Provides consistent authentication behavior across website and EOS systems
 * with enhanced security features including PKCE, rate limiting, and session management.
 */
export * from './types';
export * from './repositories';
export * from './security';
export { AuthCore } from './core';
export { GoogleOAuthService, createGoogleOAuthService } from './services/GoogleOAuthService';
export { SessionManager } from './services/SessionManager';
export { RememberMeService } from './services/RememberMeService';
export { WebsiteUserRepository, createWebsiteUserRepository, WebsiteSessionRepository, createWebsiteSessionRepository, WebsiteRememberMeRepository, createWebsiteRememberMeRepository } from './adapters/website';
export type { BaseUser, AuthSession, RememberMeToken, AuthResult, SessionValidationResult, LoginRequest, RegistrationRequest, SessionOptions, SecurityConfig, GoogleUserInfo, OAuthStateParams } from './types';
export type { IUserRepository, ISessionRepository, IRememberMeRepository, IRateLimitRepository, IAuditRepository, IAuthRepositories, IRepositoryFactory } from './repositories';
export declare const version = "1.0.0";
export declare const name = "@infinityvault/shared-auth";
//# sourceMappingURL=index.d.ts.map