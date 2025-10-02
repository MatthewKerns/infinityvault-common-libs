/**
 * Google Authentication Types and Utilities
 * Shared between website and EOS backends
 */

import { OAuth2Client } from 'google-auth-library';

export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture?: string;
  locale?: string;
  hd?: string; // Hosted domain for G Suite accounts
}

export interface GoogleAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

/**
 * Basic Google Auth Service for backend operations
 * This provides core Google OAuth functionality that can be used
 * by both website and EOS backends
 */
export class GoogleAuthService {
  private oauth2Client: OAuth2Client;

  constructor(config: GoogleAuthConfig) {
    this.oauth2Client = new OAuth2Client(
      config.clientId,
      config.clientSecret,
      config.redirectUri
    );
  }

  /**
   * Generate Google OAuth URL for authentication
   */
  generateAuthUrl(scopes: string[] = ['openid', 'email', 'profile']): string {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true
    });
  }

  /**
   * Exchange authorization code for tokens
   */
  async getTokens(code: string): Promise<{
    access_token?: string;
    refresh_token?: string;
    id_token?: string;
  }> {
    const { tokens } = await this.oauth2Client.getToken(code);
    return {
      access_token: tokens.access_token ?? undefined,
      refresh_token: tokens.refresh_token ?? undefined,
      id_token: tokens.id_token ?? undefined
    };
  }

  /**
   * Get user info from Google using access token
   */
  async getUserInfo(accessToken: string): Promise<GoogleUserInfo> {
    this.oauth2Client.setCredentials({ access_token: accessToken });

    const response = await this.oauth2Client.request({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo'
    });

    return response.data as GoogleUserInfo;
  }

  /**
   * Verify ID token and extract user info
   */
  async verifyIdToken(idToken: string): Promise<GoogleUserInfo> {
    const ticket = await this.oauth2Client.verifyIdToken({
      idToken,
      audience: this.oauth2Client._clientId
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid ID token');
    }

    return {
      id: payload.sub!,
      email: payload.email!,
      verified_email: payload.email_verified || false,
      name: payload.name!,
      given_name: payload.given_name!,
      family_name: payload.family_name!,
      picture: payload.picture,
      locale: payload.locale,
      hd: payload.hd
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(refreshToken: string): Promise<string> {
    this.oauth2Client.setCredentials({ refresh_token: refreshToken });
    const { credentials } = await this.oauth2Client.refreshAccessToken();

    if (!credentials.access_token) {
      throw new Error('Failed to refresh access token');
    }

    return credentials.access_token;
  }
}