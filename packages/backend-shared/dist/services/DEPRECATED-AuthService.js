"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var google_auth_library_1 = require("google-auth-library");
var crypto_1 = require("crypto");
// DEPRECATED: This service has cross-package dependencies that violate clean architecture
// These imports are commented out to allow for clean repository separation
// TODO: Remove this entire file once migration to new auth system is complete
// import { AuthRepository } from '../../website/src/repositories/AuthRepository';
// import { UserRepository } from '../../website/src/repositories/UserRepository';
// import { UserService } from '../../website/src/services/UserService';
// import { config } from '../../website/src/config';
// Stub implementations to prevent compilation errors
var AuthRepository = null;
var UserRepository = null;
var UserService = null;
var config = { appUrl: process.env.APP_URL || 'http://localhost:3000' };
/**
 * @deprecated Use @infinityvault/shared-auth components instead
 */
var AuthService = /** @class */ (function () {
    function AuthService() {
        console.warn('⚠️ AuthService is DEPRECATED. Use @infinityvault/shared-auth components instead.');
        this.oauth2Client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
        this.authRepository = new AuthRepository();
        this.userRepository = new UserRepository();
        this.userService = new UserService();
    }
    // Google OAuth methods
    AuthService.prototype.generateAuthUrl = function (params) {
        console.warn('⚠️ AuthService.generateAuthUrl is DEPRECATED. Use GoogleOAuthService.generateAuthUrl instead.');
        var state = this.generateSecureState(params);
        var scopes = __spreadArray([], config.oauth.scopes, true);
        if (params.includeGmail) {
            scopes.push('https://www.googleapis.com/auth/gmail.send');
        }
        var isConsumerFlow = params.createAccount && !params.includeGmail;
        return this.oauth2Client.generateAuthUrl({
            access_type: isConsumerFlow ? 'online' : 'offline',
            prompt: isConsumerFlow ? 'select_account' : 'consent',
            scope: scopes,
            state: state,
        });
    };
    AuthService.prototype.generateSecureState = function (params) {
        var stateData = __assign(__assign({}, params), { timestamp: Date.now(), nonce: Math.random().toString(36) });
        var stateString = Buffer.from(JSON.stringify(stateData)).toString('base64');
        var signature = crypto_1.default.createHmac('sha256', config.oauth.stateSecret).update(stateString).digest('hex');
        return "".concat(stateString, ".").concat(signature);
    };
    AuthService.prototype.verifyAndParseState = function (state) {
        console.warn('⚠️ AuthService.verifyAndParseState is DEPRECATED. Use GoogleOAuthService.handleCallback instead.');
        try {
            var _a = state.split('.'), stateString = _a[0], signature = _a[1];
            var expectedSignature = crypto_1.default.createHmac('sha256', config.oauth.stateSecret).update(stateString).digest('hex');
            if (signature !== expectedSignature)
                return null;
            var stateData = JSON.parse(Buffer.from(stateString, 'base64').toString());
            if (Date.now() - stateData.timestamp > 5 * 60 * 1000)
                return null;
            return stateData;
        }
        catch (_b) {
            return null;
        }
    };
    AuthService.prototype.exchangeCodeForTokens = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.oauth2Client.getToken(code)];
                    case 1:
                        tokens = (_a.sent()).tokens;
                        return [2 /*return*/, tokens];
                }
            });
        });
    };
    AuthService.prototype.getUserInfo = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                            headers: { 'Authorization': "Bearer ".concat(accessToken) },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    // Handle OAuth callback - wrapper for existing method
    AuthService.prototype.handleCallback = function (code, state) {
        return __awaiter(this, void 0, void 0, function () {
            var authRequest, tokens, userInfo, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.warn('⚠️ AuthService.handleCallback is DEPRECATED. Use GoogleOAuthService.handleCallback instead.');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        authRequest = this.verifyAndParseState(state);
                        if (!authRequest) {
                            return [2 /*return*/, { success: false, error: 'Invalid state parameter' }];
                        }
                        return [4 /*yield*/, this.exchangeCodeForTokens(code)];
                    case 2:
                        tokens = _a.sent();
                        if (!tokens.access_token) {
                            return [2 /*return*/, { success: false, error: 'Failed to obtain access token' }];
                        }
                        return [4 /*yield*/, this.getUserInfo(tokens.access_token)];
                    case 3:
                        userInfo = _a.sent();
                        if (!userInfo.email) {
                            return [2 /*return*/, { success: false, error: 'Failed to obtain user information' }];
                        }
                        return [2 /*return*/, {
                                success: true,
                                userInfo: userInfo,
                                authRequest: authRequest
                            }];
                    case 4:
                        error_1 = _a.sent();
                        console.error('OAuth callback error:', error_1);
                        return [2 /*return*/, {
                                success: false,
                                error: error_1 instanceof Error ? error_1.message : 'Unknown error'
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // OAuth callback handling
    AuthService.prototype.handleOAuthCallback = function (code, stateData, req) {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, userInfo, user, sessionToken, expiresAt, shouldRemember, sessionData, session;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.warn('⚠️ AuthService.handleOAuthCallback is DEPRECATED. Use GoogleOAuthService.handleCallback instead.');
                        return [4 /*yield*/, this.exchangeCodeForTokens(code)];
                    case 1:
                        tokens = _b.sent();
                        return [4 /*yield*/, this.getUserInfo(tokens.access_token)];
                    case 2:
                        userInfo = _b.sent();
                        return [4 /*yield*/, this.userService.findOrCreateUser(userInfo)];
                    case 3:
                        user = _b.sent();
                        sessionToken = this.generateSessionToken();
                        expiresAt = new Date();
                        shouldRemember = true;
                        expiresAt.setDate(expiresAt.getDate() + (shouldRemember ? 30 : 7));
                        sessionData = {
                            userId: user.id,
                            sessionToken: sessionToken,
                            expiresAt: expiresAt,
                            ipAddress: req.ip || ((_a = req.connection) === null || _a === void 0 ? void 0 : _a.remoteAddress),
                            userAgent: req.get('User-Agent')
                        };
                        return [4 /*yield*/, this.authRepository.createSession(user.id, sessionData)];
                    case 4:
                        session = _b.sent();
                        console.log('✅ Session created in database:', {
                            userId: user.id,
                            sessionToken: sessionToken.substring(0, 8) + '...',
                            duration: shouldRemember ? '30 days' : '7 days',
                            autoRemember: 'Google Auth'
                        });
                        // Update last login
                        return [4 /*yield*/, this.userRepository.updateLastLogin(user.id)];
                    case 5:
                        // Update last login
                        _b.sent();
                        return [2 /*return*/, { user: user, session: session }];
                }
            });
        });
    };
    // Session management methods
    AuthService.prototype.generateSessionToken = function () {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    };
    AuthService.prototype.createSession = function (userId_1, req_1) {
        return __awaiter(this, arguments, void 0, function (userId, req, options) {
            var sessionToken, expiresAt, shouldRemember, sessionData;
            var _a;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.warn('⚠️ AuthService.createSession is DEPRECATED. Use AuthCore.createSession instead.');
                        sessionToken = this.generateSessionToken();
                        expiresAt = new Date();
                        shouldRemember = options.isGoogleAuth || options.rememberMe;
                        expiresAt.setDate(expiresAt.getDate() + (shouldRemember ? 30 : 7));
                        sessionData = {
                            userId: userId,
                            sessionToken: sessionToken,
                            expiresAt: expiresAt,
                            ipAddress: req.ip || ((_a = req.connection) === null || _a === void 0 ? void 0 : _a.remoteAddress),
                            userAgent: req.get('User-Agent')
                        };
                        return [4 /*yield*/, this.authRepository.createSession(userId, sessionData)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    AuthService.prototype.validateSession = function (sessionToken) {
        return __awaiter(this, void 0, void 0, function () {
            var session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.warn('⚠️ AuthService.validateSession is DEPRECATED. Use AuthCore.validateSession instead.');
                        return [4 /*yield*/, this.authRepository.findSessionByToken(sessionToken)];
                    case 1:
                        session = _a.sent();
                        if (!session || session.expiresAt < new Date()) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, {
                                userId: session.userId,
                                expiresAt: session.expiresAt
                            }];
                }
            });
        });
    };
    AuthService.prototype.getUserBySession = function (sessionToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.warn('⚠️ AuthService.getUserBySession is DEPRECATED. Use AuthCore.validateSession instead.');
                        return [4 /*yield*/, this.authRepository.findUserBySessionToken(sessionToken)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.deleteSession = function (sessionToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.warn('⚠️ AuthService.deleteSession is DEPRECATED. Use AuthCore.logout instead.');
                        return [4 /*yield*/, this.authRepository.invalidateSession(sessionToken)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.cleanupExpiredSessions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.warn('⚠️ AuthService.cleanupExpiredSessions is DEPRECATED. Use repository cleanup methods instead.');
                        return [4 /*yield*/, this.authRepository.cleanupExpiredSessions()];
                    case 1:
                        _a.sent();
                        console.log('🧽 Cleaned up expired sessions');
                        return [2 /*return*/];
                }
            });
        });
    };
    // Helper methods
    AuthService.prototype.setCookieAndRedirect = function (res, session, user, prizeParams) {
        console.warn('⚠️ AuthService.setCookieAndRedirect is DEPRECATED. Handle cookie setting in controllers instead.');
        res.cookie(config.cookie.name, session.sessionToken, __assign(__assign({}, config.cookie.options), { expires: session.expiresAt }));
        var hasCompletedProfile = this.userService.isProfileComplete(user);
        var redirectUrl = hasCompletedProfile
            ? "".concat(config.urls.frontend, "/scratch-win-promo-links").concat(prizeParams)
            : "".concat(config.urls.frontend, "/profile-completion").concat(prizeParams);
        res.send("\n      <html>\n        <script>\n          document.cookie = \"".concat(config.cookie.name, "=").concat(session.sessionToken, "; path=/; domain=localhost; expires=").concat(session.expiresAt.toUTCString(), "\";\n          window.location.href = \"").concat(redirectUrl, "\";\n        </script>\n      </html>\n    "));
    };
    return AuthService;
}());
exports.AuthService = AuthService;
