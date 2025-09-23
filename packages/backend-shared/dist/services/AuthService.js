import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";
import { AuthRepository } from '../../website/src/repositories/AuthRepository';
import { UserRepository } from '../../website/src/repositories/UserRepository';
import { UserService } from '../../website/src/services/UserService';
import { config } from '../../website/src/config';
export class AuthService {
    oauth2Client;
    authRepository;
    userRepository;
    userService;
    constructor() {
        this.oauth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
        this.authRepository = new AuthRepository();
        this.userRepository = new UserRepository();
        this.userService = new UserService();
    }
    // Google OAuth methods
    generateAuthUrl(params) {
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
    generateSecureState(params) {
        const stateData = { ...params, timestamp: Date.now(), nonce: Math.random().toString(36) };
        const stateString = Buffer.from(JSON.stringify(stateData)).toString('base64');
        const signature = crypto.createHmac('sha256', config.oauth.stateSecret).update(stateString).digest('hex');
        return `${stateString}.${signature}`;
    }
    verifyAndParseState(state) {
        try {
            const [stateString, signature] = state.split('.');
            const expectedSignature = crypto.createHmac('sha256', config.oauth.stateSecret).update(stateString).digest('hex');
            if (signature !== expectedSignature)
                return null;
            const stateData = JSON.parse(Buffer.from(stateString, 'base64').toString());
            if (Date.now() - stateData.timestamp > 5 * 60 * 1000)
                return null;
            return stateData;
        }
        catch {
            return null;
        }
    }
    async exchangeCodeForTokens(code) {
        const { tokens } = await this.oauth2Client.getToken(code);
        return tokens;
    }
    async getUserInfo(accessToken) {
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        return response.json();
    }
    // Handle OAuth callback - wrapper for existing method
    async handleCallback(code, state) {
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
        }
        catch (error) {
            console.error('OAuth callback error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }
    // OAuth callback handling
    async handleOAuthCallback(code, stateData, req) {
        const tokens = await this.exchangeCodeForTokens(code);
        const userInfo = await this.getUserInfo(tokens.access_token);
        const user = await this.userService.findOrCreateUser(userInfo);
        // Create session using repository
        const sessionToken = this.generateSessionToken();
        const expiresAt = new Date();
        const shouldRemember = true; // Auto-enable remember me for Google federated logins
        expiresAt.setDate(expiresAt.getDate() + (shouldRemember ? 30 : 7));
        const sessionData = {
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
    generateSessionToken() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
    async createSession(userId, req, options = {}) {
        const sessionToken = this.generateSessionToken();
        const expiresAt = new Date();
        const shouldRemember = options.isGoogleAuth || options.rememberMe;
        expiresAt.setDate(expiresAt.getDate() + (shouldRemember ? 30 : 7));
        const sessionData = {
            userId,
            sessionToken,
            expiresAt,
            ipAddress: req.ip || req.connection?.remoteAddress,
            userAgent: req.get('User-Agent')
        };
        return await this.authRepository.createSession(userId, sessionData);
    }
    async validateSession(sessionToken) {
        const session = await this.authRepository.findSessionByToken(sessionToken);
        if (!session || session.expiresAt < new Date()) {
            return null;
        }
        return {
            userId: session.userId,
            expiresAt: session.expiresAt
        };
    }
    async getUserBySession(sessionToken) {
        return await this.authRepository.findUserBySessionToken(sessionToken);
    }
    async deleteSession(sessionToken) {
        await this.authRepository.invalidateSession(sessionToken);
    }
    async cleanupExpiredSessions() {
        await this.authRepository.cleanupExpiredSessions();
        console.log('🧽 Cleaned up expired sessions');
    }
    // Helper methods
    setCookieAndRedirect(res, session, user, prizeParams) {
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
