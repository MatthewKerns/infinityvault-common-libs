"use strict";
// Re-export the Google Auth service for use by both website and chatbot backends
// This maintains the separation while allowing shared authentication functionality
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthService = void 0;
var GoogleAuthService_1 = require("../../website/src/services/GoogleAuthService");
Object.defineProperty(exports, "GoogleAuthService", { enumerable: true, get: function () { return GoogleAuthService_1.GoogleAuthService; } });
