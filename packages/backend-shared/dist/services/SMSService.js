"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSService = void 0;
var twilio_1 = require("twilio");
var SMSService = /** @class */ (function () {
    function SMSService() {
        this.client = null;
        this.verifyServiceSid = null;
        // Check if Twilio is configured
        this.isEnabled = !!(process.env.TWILIO_ACCOUNT_SID &&
            process.env.TWILIO_AUTH_TOKEN &&
            process.env.TWILIO_PHONE_NUMBER);
        if (this.isEnabled) {
            this.client = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
            this.verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID || null;
            console.log('SMS Service initialized with Twilio');
        }
        else {
            console.warn('SMS Service: Twilio credentials not configured. SMS features disabled.');
        }
    }
    /**
     * Send verification code via SMS using Twilio Verify
     */
    SMSService.prototype.sendVerificationCode = function (phoneNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var verification, code, message, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isEnabled) {
                            console.log("[SMS Mock] Would send verification code to ".concat(phoneNumber));
                            return [2 /*return*/, {
                                    success: true,
                                    sid: 'mock_verification_sid',
                                    message: 'SMS service not configured. Mock send successful.'
                                }];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        // Validate phone number format
                        if (!this.isValidPhoneNumber(phoneNumber)) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: 'Invalid phone number format. Please use E.164 format (e.g., +1234567890)'
                                }];
                        }
                        if (!(this.verifyServiceSid && this.client)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.client.verify.v2
                                .services(this.verifyServiceSid)
                                .verifications.create({
                                to: phoneNumber,
                                channel: 'sms'
                            })];
                    case 2:
                        verification = _a.sent();
                        console.log("SMS verification sent to ".concat(phoneNumber, ", SID: ").concat(verification.sid));
                        return [2 /*return*/, {
                                success: true,
                                sid: verification.sid,
                                message: 'Verification code sent successfully'
                            }];
                    case 3:
                        if (!this.client) return [3 /*break*/, 5];
                        code = this.generateCode();
                        return [4 /*yield*/, this.client.messages.create({
                                body: "Your Infinity Vault Cards verification code is: ".concat(code),
                                from: process.env.TWILIO_PHONE_NUMBER,
                                to: phoneNumber
                            })];
                    case 4:
                        message = _a.sent();
                        console.log("SMS sent to ".concat(phoneNumber, ", Message SID: ").concat(message.sid));
                        return [2 /*return*/, {
                                success: true,
                                sid: message.sid,
                                message: 'Verification code sent successfully'
                            }];
                    case 5: return [2 /*return*/, {
                            success: false,
                            message: 'SMS service not properly configured'
                        }];
                    case 6:
                        error_1 = _a.sent();
                        console.error('Error sending SMS:', error_1);
                        // Handle specific Twilio errors
                        if (error_1.code === 21211) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: 'Invalid phone number. Please check the number and try again.'
                                }];
                        }
                        if (error_1.code === 21608) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: 'Phone number is not verified with Twilio (trial account limitation)'
                                }];
                        }
                        return [2 /*return*/, {
                                success: false,
                                message: 'Failed to send verification code. Please try again.'
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Verify SMS code using Twilio Verify
     */
    SMSService.prototype.verifyCode = function (phoneNumber, code) {
        return __awaiter(this, void 0, void 0, function () {
            var valid, verificationCheck, valid, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isEnabled) {
                            console.log("[SMS Mock] Would verify code ".concat(code, " for ").concat(phoneNumber));
                            valid = /^\d{6}$/.test(code);
                            return [2 /*return*/, {
                                    valid: valid,
                                    message: valid ? 'Mock verification successful' : 'Invalid code format'
                                }];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!this.verifyServiceSid || !this.client) {
                            // If Verify service not configured, we can't verify
                            // In production, this should integrate with OTP service
                            return [2 /*return*/, {
                                    valid: false,
                                    message: 'Verification service not configured'
                                }];
                        }
                        return [4 /*yield*/, this.client.verify.v2
                                .services(this.verifyServiceSid)
                                .verificationChecks.create({
                                to: phoneNumber,
                                code: code
                            })];
                    case 2:
                        verificationCheck = _a.sent();
                        valid = verificationCheck.status === 'approved';
                        console.log("SMS verification for ".concat(phoneNumber, ": ").concat(verificationCheck.status));
                        return [2 /*return*/, {
                                valid: valid,
                                message: valid ? 'Phone number verified successfully' : 'Invalid verification code'
                            }];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Error verifying SMS code:', error_2);
                        if (error_2.code === 20404) {
                            return [2 /*return*/, {
                                    valid: false,
                                    message: 'Verification code expired or not found'
                                }];
                        }
                        return [2 /*return*/, {
                                valid: false,
                                message: 'Verification failed. Please try again.'
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Send a custom SMS message
     */
    SMSService.prototype.sendSMS = function (phoneNumber, message) {
        return __awaiter(this, void 0, void 0, function () {
            var sms, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isEnabled || !this.client) {
                            console.log("[SMS Mock] Would send to ".concat(phoneNumber, ": ").concat(message));
                            return [2 /*return*/, {
                                    success: true,
                                    sid: 'mock_message_sid',
                                    message: 'SMS service not configured. Mock send successful.'
                                }];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.messages.create({
                                body: message,
                                from: process.env.TWILIO_PHONE_NUMBER,
                                to: phoneNumber
                            })];
                    case 2:
                        sms = _a.sent();
                        console.log("Custom SMS sent to ".concat(phoneNumber, ", SID: ").concat(sms.sid));
                        return [2 /*return*/, {
                                success: true,
                                sid: sms.sid,
                                message: 'SMS sent successfully'
                            }];
                    case 3:
                        error_3 = _a.sent();
                        console.error('Error sending custom SMS:', error_3);
                        return [2 /*return*/, {
                                success: false,
                                message: 'Failed to send SMS'
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Validate phone number format (E.164)
     */
    SMSService.prototype.isValidPhoneNumber = function (phoneNumber) {
        // E.164 format: + followed by country code and number
        // Length should be between 10 and 15 digits total
        var e164Regex = /^\+[1-9]\d{1,14}$/;
        return e164Regex.test(phoneNumber);
    };
    /**
     * Generate a 6-digit verification code
     */
    SMSService.prototype.generateCode = function () {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };
    /**
     * Format phone number to E.164 format
     */
    SMSService.prototype.formatPhoneNumber = function (phoneNumber, defaultCountryCode) {
        if (defaultCountryCode === void 0) { defaultCountryCode = '+1'; }
        // Remove all non-digit characters
        var cleaned = phoneNumber.replace(/\D/g, '');
        // If number doesn't start with country code, add default
        if (!phoneNumber.startsWith('+')) {
            // US phone numbers
            if (defaultCountryCode === '+1' && cleaned.length === 10) {
                cleaned = '1' + cleaned;
            }
            return defaultCountryCode + cleaned;
        }
        return '+' + cleaned;
    };
    return SMSService;
}());
exports.SMSService = SMSService;
