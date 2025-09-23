/**
 * DEPRECATED: This service has been replaced by @infinityvault/shared-auth
 *
 * Migration Guide:
 *
 * OLD:
 * import { AuthService } from './AuthService';
 * const authService = new AuthService();
 *
 * NEW:
 * import { AuthCore, GoogleOAuthService, createWebsiteUserRepository, createWebsiteSessionRepository, createWebsiteRememberMeRepository, SecurityValidator } from '@infinityvault/shared-auth';
 * import { db } from '../db';
 *
 * const database = db();
 * const userRepository = createWebsiteUserRepository({}, database);
 * const sessionRepository = createWebsiteSessionRepository({}, database);
 * const rememberMeRepository = createWebsiteRememberMeRepository({}, database);
 * const securityValidator = new SecurityValidator({...});
 * const authCore = new AuthCore(userRepository, sessionRepository, rememberMeRepository, securityValidator);
 * const googleOAuth = new GoogleOAuthService({...}, userRepository, securityValidator);
 *
 * Benefits of new implementation:
 * - Unified authentication system across website and EOS
 * - Enhanced security with PKCE, rate limiting, and audit logging
 * - Remember me token rotation and management
 * - Database-agnostic repository pattern
 * - Better error handling and transaction support
 * - Comprehensive session management
 * - Suspicious activity detection and prevention
 *
 * This file should be removed after all imports are updated.
 */

import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";
// DEPRECATED: This service has cross-package dependencies that violate clean architecture
// These imports are commented out to allow for clean repository separation
// TODO: Remove this entire file once migration to new auth system is complete
// import { AuthRepository } from '../../website/src/repositories/AuthRepository';
// import { UserRepository } from '../../website/src/repositories/UserRepository';
// import { UserService } from '../../website/src/services/UserService';
// import { config } from '../../website/src/config';

// Stub implementations to prevent compilation errors
const AuthRepository = null as any;
const UserRepository = null as any;
const UserService = null as any;
const config = { appUrl: process.env.APP_URL || 'http://localhost:3000' };
import type { User, AuthSession, NewAuthSession } from '@infinityvault/website-middleware';

interface StateParams {
  claimId?: string;
  returnTo?: string;
  rememberMe?: boolean;
  createAccount?: boolean;
  prizeInfo?: string;
}

/**
 * @deprecated Use @infinityvault/shared-auth components instead
 */
export class AuthService {
  private oauth2Client: OAuth2Client;
  private authRepository: AuthRepository;
  private userRepository: UserRepository;
  private userService: UserService;

  constructor() {
    console.warn('⚠️ AuthService is DEPRECATED. Use @infinityvault/shared-auth components instead.');
    this.oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    this.authRepository = new AuthRepository();
    this.userRepository = new UserRepository();
    this.userService = new UserService();
  }

  // Google OAuth methods
  generateAuthUrl(params: StateParams & { includeGmail?: boolean }): string {
    console.warn('⚠️ AuthService.generateAuthUrl is DEPRECATED. Use GoogleOAuthService.generateAuthUrl instead.');
    const state = this.generateSecureState(params);
    const scopes = [...config.oauth.scopes];

    if (params.includeGmail) {
      scopes.push('https://www.googleapis.com/auth/gmail.send');
    }

    const isConsumerFlow = params.createAccount && !params.includeGmail;

    return this.oauth2Client.generateAuthUrl({
      access_type: isConsumerFlow ? 'online' : 'offline',
      prompt: isConsumerFlow ? 'select_account' : 'consent',
      scope: scopes,
      state,
    });
  }

  private generateSecureState(params: StateParams): string {
    const stateData = { ...params, timestamp: Date.now(), nonce: Math.random().toString(36) };
    const stateString = Buffer.from(JSON.stringify(stateData)).toString('base64');
    const signature = crypto.createHmac('sha256', config.oauth.stateSecret).update(stateString).digest('hex');
    return `${stateString}.${signature}`;
  }

  verifyAndParseState(state: string): StateParams | null {
    console.warn('⚠️ AuthService.verifyAndParseState is DEPRECATED. Use GoogleOAuthService.handleCallback instead.');
    try {
      const [stateString, signature] = state.split('.');
      const expectedSignature = crypto.createHmac('sha256', config.oauth.stateSecret).update(stateString).digest('hex');

      if (signature !== expectedSignature) return null;

      const stateData = JSON.parse(Buffer.from(stateString, 'base64').toString());
      if (Date.now() - stateData.timestamp > 5 * 60 * 1000) return null;

      return stateData;
    } catch {
      return null;
    }
  }

  private async exchangeCodeForTokens(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    return tokens;
  }

  private async getUserInfo(accessToken: string) {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    return response.json();
  }

  // Handle OAuth callback - wrapper for existing method
  async handleCallback(code: string, state: string): Promise<{
    success: boolean;
    userInfo?: any;
    authRequest?: StateParams | null;
    error?: string;
  }> {
    console.warn('⚠️ AuthService.handleCallback is DEPRECATED. Use GoogleOAuthService.handleCallback instead.');
    try {
      // Verify and parse the state parameter
      const authRequest = this.verifyAndParseState(state);
      if (!authRequest) {
        return { success: false, error: 'Invalid state parameter' };
      }

      // Exchange code for tokens
      const tokens = await this.exchangeCodeForTokens(code);
      if (!tokens.access_token) {
        return { success: false, error: 'Failed to obtain access token' };
      }

      // Get user info from Google
      const userInfo = await this.getUserInfo(tokens.access_token);
      if (!userInfo.email) {
        return { success: false, error: 'Failed to obtain user information' };
      }

      return {
        success: true,
        userInfo,
        authRequest
      };
    } catch (error) {
      console.error('OAuth callback error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // OAuth callback handling
  async handleOAuthCallback(code: string, stateData: any, req: any): Promise<{ user: User; session: AuthSession }> {
    console.warn('⚠️ AuthService.handleOAuthCallback is DEPRECATED. Use GoogleOAuthService.handleCallback instead.');
    const tokens = await this.exchangeCodeForTokens(code);
    const userInfo = await this.getUserInfo(tokens.access_token);
    const user = await this.userService.findOrCreateUser(userInfo);

    // Create session using repository
    const sessionToken = this.generateSessionToken();
    const expiresAt = new Date();
    const shouldRemember = true; // Auto-enable remember me for Google federated logins
    expiresAt.setDate(expiresAt.getDate() + (shouldRemember ? 30 : 7));

    const sessionData: NewAuthSession = {
      userId: user.id,
      sessionToken,
      expiresAt,
      ipAddress: req.ip || req.connection?.remoteAddress,
      userAgent: req.get('User-Agent')
    };

    const session = await this.authRepository.createSession(user.id, sessionData);

    console.log('✅ Session created in database:', {
      userId: user.id,
      sessionToken: sessionToken.substring(0, 8) + '...',
      duration: shouldRemember ? '30 days' : '7 days',
      autoRemember: 'Google Auth'
    });

    // Update last login
    await this.userRepository.updateLastLogin(user.id);

    return { user, session };
  }

  // Session management methods
  private generateSessionToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  async createSession(userId: string, req: any, options: { rememberMe?: boolean; isGoogleAuth?: boolean } = {}): Promise<AuthSession> {
    console.warn('⚠️ AuthService.createSession is DEPRECATED. Use AuthCore.createSession instead.');
    const sessionToken = this.generateSessionToken();
    const expiresAt = new Date();
    const shouldRemember = options.isGoogleAuth || options.rememberMe;
    expiresAt.setDate(expiresAt.getDate() + (shouldRemember ? 30 : 7));

    const sessionData: NewAuthSession = {
      userId,
      sessionToken,
      expiresAt,
      ipAddress: req.ip || req.connection?.remoteAddress,
      userAgent: req.get('User-Agent')
    };

    return await this.authRepository.createSession(userId, sessionData);
  }

  async validateSession(sessionToken: string): Promise<{ userId: string; expiresAt: Date } | null> {
    console.warn('⚠️ AuthService.validateSession is DEPRECATED. Use AuthCore.validateSession instead.');
    const session = await this.authRepository.findSessionByToken(sessionToken);

    if (!session || session.expiresAt < new Date()) {
      return null;
    }

    return {
      userId: session.userId,
      expiresAt: session.expiresAt
    };
  }

  async getUserBySession(sessionToken: string): Promise<User | null> {
    console.warn('⚠️ AuthService.getUserBySession is DEPRECATED. Use AuthCore.validateSession instead.');
    return await this.authRepository.findUserBySessionToken(sessionToken);
  }

  async deleteSession(sessionToken: string): Promise<void> {
    console.warn('⚠️ AuthService.deleteSession is DEPRECATED. Use AuthCore.logout instead.');
    await this.authRepository.invalidateSession(sessionToken);
  }

  async cleanupExpiredSessions(): Promise<void> {
    console.warn('⚠️ AuthService.cleanupExpiredSessions is DEPRECATED. Use repository cleanup methods instead.');
    await this.authRepository.cleanupExpiredSessions();
    console.log('🧽 Cleaned up expired sessions');
  }

  // Helper methods
  setCookieAndRedirect(res: any, session: any, user: any, prizeParams: string): void {
    console.warn('⚠️ AuthService.setCookieAndRedirect is DEPRECATED. Handle cookie setting in controllers instead.');
    res.cookie(config.cookie.name, session.sessionToken, {
      ...config.cookie.options,
      expires: session.expiresAt
    });

    const hasCompletedProfile = this.userService.isProfileComplete(user);
    const redirectUrl = hasCompletedProfile
      ? `${config.urls.frontend}/scratch-win-promo-links${prizeParams}`
      : `${config.urls.frontend}/profile-completion${prizeParams}`;

    res.send(`
      <html>
        <script>
          document.cookie = "${config.cookie.name}=${session.sessionToken}; path=/; domain=localhost; expires=${session.expiresAt.toUTCString()}";
          window.location.href = "${redirectUrl}";
        </script>
      </html>
    `);
  }
}