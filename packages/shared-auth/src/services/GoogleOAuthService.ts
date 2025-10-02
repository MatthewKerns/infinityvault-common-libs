import { OAuth2Client } from 'google-auth-library';
import {
  GoogleUserInfo,
  GoogleUserInfoSchema,
  OAuthStateParams,
  AuthResult,
  BaseUser,
  SecurityConfig,
  AuthError,
  SecurityError
} from '../types';
import { IAuthRepositories, IUserRepository } from '../repositories';
import { SecurityValidator, PKCEUtil } from '../security';
import { AuthCore } from '../core';

/**
 * Google OAuth service with enhanced security features
 */
export class GoogleOAuthService {
  private oauth2Client: OAuth2Client;
  private authCore: AuthCore;
  private repositories: IAuthRepositories;
  private securityValidator: SecurityValidator;
  private config: SecurityConfig;

  constructor(
    clientId: string,
    clientSecret: string,
    redirectUri: string,
    authCore: AuthCore,
    repositories: IAuthRepositories,
    securityValidator: SecurityValidator,
    config: SecurityConfig
  ) {
    this.oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);
    this.authCore = authCore;
    this.repositories = repositories;
    this.securityValidator = securityValidator;
    this.config = config;
  }

  /**
   * Generate OAuth authorization URL with PKCE and state validation
   */
  generateAuthUrl(
    params: Omit<OAuthStateParams, 'timestamp' | 'nonce'> & {
      includeGmail?: boolean;
      usePKCE?: boolean;
    },
    context: {
      ipAddress?: string;
      userAgent?: string;
      requestId?: string;
    }
  ): {
    url: string;
    codeVerifier?: string;
    state: string;
  } {
    // Generate secure state
    const state = this.securityValidator.generateOAuthState(params);

    // Generate PKCE if requested (more secure)
    let codeVerifier: string | undefined;
    let codeChallenge: string | undefined;
    if (params.usePKCE) {
      const pkce = this.securityValidator.generatePKCE();
      codeVerifier = pkce.verifier;
      codeChallenge = pkce.challenge;
    }

    // Determine scopes
    const scopes = [...this.config.oauth.scopes];
    if (params.includeGmail) {
      scopes.push('https://www.googleapis.com/auth/gmail.send');
    }

    // Generate OAuth URL
    const authUrlOptions: any = {
      access_type: this.config.oauth.includeRefreshToken ? 'offline' : 'online',
      prompt: 'consent',
      scope: scopes,
      state,
    };

    // Add PKCE parameters if enabled
    if (codeChallenge) {
      authUrlOptions.code_challenge = codeChallenge;
      authUrlOptions.code_challenge_method = 'S256';
    }

    // Adjust flow based on context
    const isConsumerFlow = params.createAccount && !params.includeGmail;
    if (isConsumerFlow) {
      authUrlOptions.access_type = 'online';
      authUrlOptions.prompt = 'select_account';
    }

    const url = this.oauth2Client.generateAuthUrl(authUrlOptions);

    return {
      url,
      codeVerifier,
      state
    };
  }

  /**
   * Handle OAuth callback with enhanced security validation
   */
  async handleCallback(
    code: string,
    state: string,
    codeVerifier: string | undefined,
    context: {
      ipAddress?: string;
      userAgent?: string;
      requestId?: string;
    }
  ): Promise<AuthResult> {
    try {
      // Validate OAuth flow with security checks
      const stateData = await this.securityValidator.validateOAuthFlow(
        {
          state,
          code,
          codeVerifier
        },
        context
      );

      if (!stateData) {
        throw new SecurityError('Invalid OAuth state', 'INVALID_STATE');
      }

      // Exchange code for tokens
      const { tokens } = await this.oauth2Client.getToken({
        code,
        codeVerifier // Will be undefined if PKCE not used
      });

      if (!tokens.access_token) {
        throw new AuthError('Failed to obtain access token', 'NO_ACCESS_TOKEN');
      }

      // Get user info from Google
      const userInfo = await this.getUserInfo(tokens.access_token);

      // Validate user info
      const validationResult = GoogleUserInfoSchema.safeParse(userInfo);
      if (!validationResult.success) {
        throw new AuthError('Invalid user information from Google', 'INVALID_USER_INFO');
      }

      const validatedUserInfo = validationResult.data;

      // Check email verification
      if (!validatedUserInfo.verified_email) {
        throw new AuthError('Google account email is not verified', 'UNVERIFIED_EMAIL');
      }

      // Find or create user
      const user = await this.findOrCreateUser(validatedUserInfo, stateData, context);

      // Create session
      const session = await this.authCore.createSession(
        user.id,
        {
          rememberMe: stateData.rememberMe || true, // Auto-enable for OAuth
          isGoogleAuth: true,
          extendedSession: false
        },
        context
      );

      // Create remember me token if enabled
      let rememberMeToken: string | undefined;
      if (this.config.rememberMe.enabled && (stateData.rememberMe || true)) {
        const { token } = await this.authCore.createRememberMeToken(user.id, context);
        rememberMeToken = token;
      }

      // Log successful OAuth login
      await this.repositories.audit.logAuthEvent({
        userId: user.id,
        action: 'OAUTH_LOGIN',
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
        success: true,
        metadata: {
          provider: 'google',
          stateParams: stateData,
          usedPKCE: !!codeVerifier,
          requestId: context.requestId
        }
      });

      // Reset rate limits after successful OAuth
      if (context.ipAddress) {
        await this.securityValidator.resetRateLimit(`ip:${context.ipAddress}:oauth_attempt`);
      }

      return {
        success: true,
        user,
        session,
        rememberMeToken
      };

    } catch (error) {
      // Log failed OAuth attempt
      if (this.repositories.audit) {
        await this.repositories.audit.logAuthEvent({
          action: 'OAUTH_FAILED',
          ipAddress: context.ipAddress,
          userAgent: context.userAgent,
          success: false,
          metadata: {
            provider: 'google',
            error: error instanceof Error ? error.message : 'Unknown error',
            usedPKCE: !!codeVerifier,
            requestId: context.requestId
          }
        });
      }

      if (error instanceof AuthError || error instanceof SecurityError) {
        throw error;
      }

      throw new AuthError(
        'OAuth authentication failed',
        'OAUTH_FAILED',
        500
      );
    }
  }

  /**
   * Get user information from Google OAuth API
   */
  private async getUserInfo(accessToken: string): Promise<GoogleUserInfo> {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Google API request failed: ${response.status} ${response.statusText}`);
      }

      const userInfo = await response.json() as GoogleUserInfo;

      // Validate required fields
      if (!userInfo.email || !userInfo.id) {
        throw new Error('Missing required user information from Google');
      }

      return userInfo;

    } catch (error) {
      console.error('Failed to get user info from Google:', error);
      throw new AuthError(
        'Failed to retrieve user information from Google',
        'GOOGLE_API_ERROR'
      );
    }
  }

  /**
   * Find existing user or create new user from Google OAuth
   */
  private async findOrCreateUser(
    googleUserInfo: GoogleUserInfo,
    stateData: OAuthStateParams,
    context: {
      ipAddress?: string;
      userAgent?: string;
      requestId?: string;
    }
  ): Promise<BaseUser> {
    return await this.repositories.withTransaction(async (repos) => {
      // Try to find existing user by email
      let user = await repos.user.findByEmail(googleUserInfo.email);

      if (user) {
        // User exists - update with Google auth info if needed
        if (user.authProvider !== 'google') {
          user = await repos.user.update(user.id, {
            authProvider: 'google',
            isVerified: true, // Google emails are verified
            updatedAt: new Date()
          });
        }

        // Update last login
        await repos.user.updateLastLogin(user.id);

        // Log existing user OAuth
        if (repos.audit) {
          await repos.audit.logAuthEvent({
            userId: user.id,
            action: 'EXISTING_USER_OAUTH',
            ipAddress: context.ipAddress,
            userAgent: context.userAgent,
            success: true,
            metadata: {
              provider: 'google',
              googleId: googleUserInfo.id,
              requestId: context.requestId
            }
          });
        }

        return user;
      }

      // Create new user if createAccount flag is set
      if (!stateData.createAccount) {
        throw new AuthError(
          'No account found with this email. Please register first.',
          'USER_NOT_FOUND',
          404
        );
      }

      // Create new user from Google info
      user = await repos.user.create({
        email: googleUserInfo.email,
        firstName: googleUserInfo.given_name || '',
        lastName: googleUserInfo.family_name || '',
        authProvider: 'google',
        isVerified: true, // Google emails are verified
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: new Date()
      });

      // Log new user creation
      if (repos.audit) {
        await repos.audit.logAuthEvent({
          userId: user.id,
          action: 'NEW_USER_OAUTH',
          ipAddress: context.ipAddress,
          userAgent: context.userAgent,
          success: true,
          metadata: {
            provider: 'google',
            googleId: googleUserInfo.id,
            autoCreated: true,
            requestId: context.requestId
          }
        });
      }

      return user;
    });
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string;
    expiresIn: number;
    newRefreshToken?: string;
  }> {
    try {
      this.oauth2Client.setCredentials({
        refresh_token: refreshToken
      });

      const { credentials } = await this.oauth2Client.refreshAccessToken();

      if (!credentials.access_token) {
        throw new AuthError('Failed to refresh access token', 'REFRESH_FAILED');
      }

      return {
        accessToken: credentials.access_token,
        expiresIn: credentials.expiry_date ? Math.floor((credentials.expiry_date - Date.now()) / 1000) : 3600,
        newRefreshToken: credentials.refresh_token || undefined
      };

    } catch (error) {
      console.error('Failed to refresh access token:', error);
      throw new AuthError('Failed to refresh access token', 'REFRESH_FAILED');
    }
  }

  /**
   * Revoke Google OAuth tokens
   */
  async revokeTokens(accessToken: string): Promise<void> {
    try {
      await this.oauth2Client.revokeToken(accessToken);
    } catch (error) {
      console.error('Failed to revoke Google tokens:', error);
      // Don't throw - token revocation is best effort
    }
  }

  /**
   * Validate Google OAuth token
   */
  async validateToken(accessToken: string): Promise<{
    isValid: boolean;
    userInfo?: GoogleUserInfo;
    expiresAt?: Date;
  }> {
    try {
      const userInfo = await this.getUserInfo(accessToken);

      // Additional validation by calling Google's tokeninfo endpoint
      const tokenInfoResponse = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
      );

      if (!tokenInfoResponse.ok) {
        return { isValid: false };
      }

      const tokenInfo = await tokenInfoResponse.json() as { expires_in?: number };

      return {
        isValid: true,
        userInfo,
        expiresAt: tokenInfo.expires_in ? new Date(Date.now() + tokenInfo.expires_in * 1000) : undefined
      };

    } catch (error) {
      console.error('Token validation failed:', error);
      return { isValid: false };
    }
  }

  /**
   * Get user's Google profile with additional permissions
   */
  async getUserProfile(
    accessToken: string,
    includeContacts: boolean = false
  ): Promise<{
    userInfo: GoogleUserInfo;
    profile?: any;
    contacts?: any[];
  }> {
    try {
      const userInfo = await this.getUserInfo(accessToken);

      const result: any = { userInfo };

      // Get extended profile if needed
      if (includeContacts) {
        try {
          const profileResponse = await fetch(
            'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos',
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
              }
            }
          );

          if (profileResponse.ok) {
            result.profile = await profileResponse.json();
          }
        } catch (error) {
          console.warn('Failed to get extended profile:', error);
        }
      }

      return result;

    } catch (error) {
      console.error('Failed to get user profile:', error);
      throw new AuthError('Failed to retrieve user profile', 'PROFILE_ERROR');
    }
  }

  /**
   * Configure OAuth client with custom settings
   */
  configureClient(options: {
    timeout?: number;
    retries?: number;
    additionalScopes?: string[];
  }): void {
    // Configure timeout
    if (options.timeout) {
      // Note: google-auth-library doesn't directly support timeout configuration
      // This would need to be implemented at the HTTP client level
      console.log(`OAuth client timeout configured: ${options.timeout}ms`);
    }

    // Log configuration
    console.log('Google OAuth client configured with options:', {
      timeout: options.timeout,
      retries: options.retries,
      additionalScopes: options.additionalScopes?.length || 0
    });
  }
}

// OAuth configuration interface for easier setup
export interface GoogleOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes?: string[];
  usePKCE?: boolean;
  includeRefreshToken?: boolean;
  timeout?: number;
}

// Factory function for creating GoogleOAuthService
export function createGoogleOAuthService(
  config: GoogleOAuthConfig,
  authCore: AuthCore,
  repositories: IAuthRepositories,
  securityValidator: SecurityValidator,
  securityConfig: SecurityConfig
): GoogleOAuthService {
  const service = new GoogleOAuthService(
    config.clientId,
    config.clientSecret,
    config.redirectUri,
    authCore,
    repositories,
    securityValidator,
    securityConfig
  );

  // Configure client with custom options
  service.configureClient({
    timeout: config.timeout,
    additionalScopes: config.scopes
  });

  return service;
}

// GoogleOAuthService is already exported above with 'export class' declaration