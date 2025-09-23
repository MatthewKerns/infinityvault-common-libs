"use strict";
/**
 * @infinityvault/shared-auth - Shared authentication services
 *
 * Provides consistent authentication behavior across website and EOS systems
 * with enhanced security features including PKCE, rate limiting, and session management.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.version = exports.createWebsiteRememberMeRepository = exports.WebsiteRememberMeRepository = exports.createWebsiteSessionRepository = exports.WebsiteSessionRepository = exports.createWebsiteUserRepository = exports.WebsiteUserRepository = exports.RememberMeService = exports.SessionManager = exports.createGoogleOAuthService = exports.GoogleOAuthService = exports.AuthCore = void 0;
// Core authentication types and interfaces
__exportStar(require("./types"), exports);
// Repository interfaces and abstractions
__exportStar(require("./repositories"), exports);
// Security utilities and validators
__exportStar(require("./security"), exports);
// Core authentication service
var core_1 = require("./core");
Object.defineProperty(exports, "AuthCore", { enumerable: true, get: function () { return core_1.AuthCore; } });
// Authentication services
var GoogleOAuthService_1 = require("./services/GoogleOAuthService");
Object.defineProperty(exports, "GoogleOAuthService", { enumerable: true, get: function () { return GoogleOAuthService_1.GoogleOAuthService; } });
Object.defineProperty(exports, "createGoogleOAuthService", { enumerable: true, get: function () { return GoogleOAuthService_1.createGoogleOAuthService; } });
var SessionManager_1 = require("./services/SessionManager");
Object.defineProperty(exports, "SessionManager", { enumerable: true, get: function () { return SessionManager_1.SessionManager; } });
var RememberMeService_1 = require("./services/RememberMeService");
Object.defineProperty(exports, "RememberMeService", { enumerable: true, get: function () { return RememberMeService_1.RememberMeService; } });
// Website-specific repository implementations
var website_1 = require("./adapters/website");
Object.defineProperty(exports, "WebsiteUserRepository", { enumerable: true, get: function () { return website_1.WebsiteUserRepository; } });
Object.defineProperty(exports, "createWebsiteUserRepository", { enumerable: true, get: function () { return website_1.createWebsiteUserRepository; } });
Object.defineProperty(exports, "WebsiteSessionRepository", { enumerable: true, get: function () { return website_1.WebsiteSessionRepository; } });
Object.defineProperty(exports, "createWebsiteSessionRepository", { enumerable: true, get: function () { return website_1.createWebsiteSessionRepository; } });
Object.defineProperty(exports, "WebsiteRememberMeRepository", { enumerable: true, get: function () { return website_1.WebsiteRememberMeRepository; } });
Object.defineProperty(exports, "createWebsiteRememberMeRepository", { enumerable: true, get: function () { return website_1.createWebsiteRememberMeRepository; } });
// Version info
exports.version = '1.0.0';
exports.name = '@infinityvault/shared-auth';
//# sourceMappingURL=index.js.map