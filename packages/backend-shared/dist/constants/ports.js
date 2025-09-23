"use strict";
/**
 * Centralized Port Configuration
 *
 * All port numbers and service URLs are defined here to maintain consistency
 * across the entire application and prevent hardcoded port mismatches.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORTS = exports.validatePortConfiguration = exports.isValidPort = exports.getEOSOAuthRedirectUri = exports.getWebsiteOAuthRedirectUri = exports.getEOSBackendUrl = exports.getWebsiteBackendUrl = exports.buildOAuthRedirectUri = exports.buildBaseUrl = exports.getEOSBackendPort = exports.getWebsiteBackendPort = exports.PRODUCTION_PORTS = exports.DEVELOPMENT_PORTS = void 0;
// Development Port Configuration
exports.DEVELOPMENT_PORTS = {
    // Backend Services
    WEBSITE_BACKEND: 3000,
    EOS_BACKEND: 3002,
    // Frontend Services  
    WEBSITE_FRONTEND: 8000,
    EOS_FRONTEND: 8002,
    // Legacy/Alternative Ports (for reference only)
    LEGACY_EOS_PORT: 3001, // DO NOT USE - maintained for migration reference
};
// Production Port Configuration  
exports.PRODUCTION_PORTS = {
    // Production services typically use standard ports (80/443)
    // or are handled by reverse proxy
    DEFAULT: 80,
    HTTPS: 443,
};
// Environment-aware port getters
var getWebsiteBackendPort = function () {
    if (process.env.NODE_ENV === 'production') {
        return parseInt(process.env.PORT || '3000', 10);
    }
    return exports.DEVELOPMENT_PORTS.WEBSITE_BACKEND;
};
exports.getWebsiteBackendPort = getWebsiteBackendPort;
var getEOSBackendPort = function () {
    if (process.env.NODE_ENV === 'production') {
        return parseInt(process.env.PORT || '3002', 10);
    }
    return exports.DEVELOPMENT_PORTS.EOS_BACKEND;
};
exports.getEOSBackendPort = getEOSBackendPort;
// Base URL builders for OAuth redirects and API calls
var buildBaseUrl = function (port, hostname) {
    if (hostname === void 0) { hostname = 'localhost'; }
    var protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    var baseHost = process.env.NODE_ENV === 'production' ? hostname : "".concat(hostname, ":").concat(port);
    return "".concat(protocol, "://").concat(baseHost);
};
exports.buildBaseUrl = buildBaseUrl;
var buildOAuthRedirectUri = function (port, hostname) {
    if (hostname === void 0) { hostname = 'localhost'; }
    var baseUrl = (0, exports.buildBaseUrl)(port, hostname);
    return "".concat(baseUrl, "/api/auth/google/callback");
};
exports.buildOAuthRedirectUri = buildOAuthRedirectUri;
// Service-specific URL builders
var getWebsiteBackendUrl = function () {
    var port = (0, exports.getWebsiteBackendPort)();
    return (0, exports.buildBaseUrl)(port, process.env.NODE_ENV === 'production' ? 'api.infinityvault.com' : 'localhost');
};
exports.getWebsiteBackendUrl = getWebsiteBackendUrl;
var getEOSBackendUrl = function () {
    var port = (0, exports.getEOSBackendPort)();
    return (0, exports.buildBaseUrl)(port, process.env.NODE_ENV === 'production' ? 'eos.infinityvault.com' : 'localhost');
};
exports.getEOSBackendUrl = getEOSBackendUrl;
// OAuth redirect URI builders
var getWebsiteOAuthRedirectUri = function () {
    var port = (0, exports.getWebsiteBackendPort)();
    var hostname = process.env.NODE_ENV === 'production' ? 'api.infinityvault.com' : 'localhost';
    return (0, exports.buildOAuthRedirectUri)(port, hostname);
};
exports.getWebsiteOAuthRedirectUri = getWebsiteOAuthRedirectUri;
var getEOSOAuthRedirectUri = function () {
    var port = (0, exports.getEOSBackendPort)();
    var hostname = process.env.NODE_ENV === 'production' ? 'eos.infinityvault.com' : 'localhost';
    return (0, exports.buildOAuthRedirectUri)(port, hostname);
};
exports.getEOSOAuthRedirectUri = getEOSOAuthRedirectUri;
// Port validation utilities
var isValidPort = function (port) {
    return port >= 1 && port <= 65535;
};
exports.isValidPort = isValidPort;
var validatePortConfiguration = function () {
    var errors = [];
    // Check that all required ports are valid
    var requiredPorts = [
        exports.DEVELOPMENT_PORTS.WEBSITE_BACKEND,
        exports.DEVELOPMENT_PORTS.EOS_BACKEND,
        exports.DEVELOPMENT_PORTS.WEBSITE_FRONTEND,
        exports.DEVELOPMENT_PORTS.EOS_FRONTEND,
    ];
    for (var _i = 0, requiredPorts_1 = requiredPorts; _i < requiredPorts_1.length; _i++) {
        var port = requiredPorts_1[_i];
        if (!(0, exports.isValidPort)(port)) {
            errors.push("Invalid port number: ".concat(port));
        }
    }
    // Check for port conflicts
    var usedPorts = new Set();
    for (var _a = 0, requiredPorts_2 = requiredPorts; _a < requiredPorts_2.length; _a++) {
        var port = requiredPorts_2[_a];
        if (usedPorts.has(port)) {
            errors.push("Port conflict detected: ".concat(port, " is used by multiple services"));
        }
        usedPorts.add(port);
    }
    return {
        valid: errors.length === 0,
        errors: errors,
    };
};
exports.validatePortConfiguration = validatePortConfiguration;
// Export all port constants for easy access
exports.PORTS = {
    DEVELOPMENT: exports.DEVELOPMENT_PORTS,
    PRODUCTION: exports.PRODUCTION_PORTS,
};
