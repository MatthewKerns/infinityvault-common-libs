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
exports.EmailService = void 0;
var mail_1 = require("@sendgrid/mail");
var nodemailer_1 = require("nodemailer");
var EmailService = /** @class */ (function () {
    function EmailService() {
        this.transporter = null;
        // Determine which email provider to use based on environment variables
        if (process.env.SENDGRID_API_KEY) {
            this.provider = 'sendgrid';
            mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
            console.log('Email Service initialized with SendGrid');
        }
        else if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
            this.provider = 'smtp';
            this.transporter = nodemailer_1.default.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT),
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });
            console.log('Email Service initialized with SMTP');
        }
        else {
            this.provider = 'mock';
            console.warn('Email Service: No email provider configured. Using mock mode.');
        }
    }
    /**
     * Send OTP verification email
     */
    EmailService.prototype.sendOTPEmail = function (email, code) {
        return __awaiter(this, void 0, void 0, function () {
            var subject, html, text, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subject = 'Your Infinity Vault Cards Verification Code';
                        html = "\n      <!DOCTYPE html>\n      <html>\n      <head>\n        <style>\n          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }\n          .container { max-width: 600px; margin: 0 auto; padding: 20px; }\n          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }\n          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }\n          .code-box { background: white; border: 2px solid #667eea; border-radius: 8px; padding: 15px; text-align: center; margin: 20px 0; }\n          .code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; }\n          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }\n          .warning { background: #fff3cd; border: 1px solid #ffc107; border-radius: 5px; padding: 10px; margin-top: 20px; }\n        </style>\n      </head>\n      <body>\n        <div class=\"container\">\n          <div class=\"header\">\n            <h1>Infinity Vault Cards</h1>\n            <p>Email Verification</p>\n          </div>\n          <div class=\"content\">\n            <h2>Verify Your Email Address</h2>\n            <p>Thank you for participating in our Scratch & Win promotion!</p>\n            <p>Please enter the following verification code to continue:</p>\n\n            <div class=\"code-box\">\n              <div class=\"code\">".concat(code, "</div>\n            </div>\n\n            <p><strong>This code expires in 10 minutes.</strong></p>\n\n            <div class=\"warning\">\n              <strong>\u26A0\uFE0F Security Notice:</strong> Never share this code with anyone. Infinity Vault Cards staff will never ask for this code.\n            </div>\n\n            <p>If you didn't request this code, please ignore this email.</p>\n          </div>\n          <div class=\"footer\">\n            <p>\u00A9 2025 Infinity Vault Cards. All rights reserved.</p>\n            <p>This is an automated message, please do not reply.</p>\n          </div>\n        </div>\n      </body>\n      </html>\n    ");
                        text = "\nInfinity Vault Cards - Email Verification\n\nYour verification code is: ".concat(code, "\n\nThis code expires in 10 minutes.\n\nIf you didn't request this code, please ignore this email.\n\n\u00A9 2025 Infinity Vault Cards\n    ");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sendEmail(email, subject, html, text)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error sending OTP email:', error_1);
                        return [2 /*return*/, {
                                success: false,
                                message: 'Failed to send verification email'
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Send prize notification email
     */
    EmailService.prototype.sendPrizeNotification = function (email, prizeInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var subject, html, text, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subject = "\uD83C\uDF89 Congratulations! You've Won ".concat(prizeInfo.prizeLabel, "!");
                        html = "\n      <!DOCTYPE html>\n      <html>\n      <head>\n        <style>\n          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }\n          .container { max-width: 600px; margin: 0 auto; padding: 20px; }\n          .header { background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }\n          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }\n          .prize-box { background: white; border: 3px solid #ffd700; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0; }\n          .prize-text { font-size: 28px; font-weight: bold; color: #ff8c00; }\n          .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin-top: 20px; }\n          .expiry { background: #fff3cd; border: 1px solid #ffc107; border-radius: 5px; padding: 10px; margin-top: 20px; }\n        </style>\n      </head>\n      <body>\n        <div class=\"container\">\n          <div class=\"header\">\n            <h1>\uD83C\uDF8A WINNER! \uD83C\uDF8A</h1>\n            <p>Infinity Vault Cards Scratch & Win</p>\n          </div>\n          <div class=\"content\">\n            <h2>Congratulations!</h2>\n            <p>You've successfully claimed your prize from our Scratch & Win promotion!</p>\n\n            <div class=\"prize-box\">\n              <div class=\"prize-text\">You Won: ".concat(prizeInfo.prizeLabel, "</div>\n            </div>\n\n            ").concat(prizeInfo.amazonLink ? "\n            <p style=\"text-align: center;\">\n              <a href=\"".concat(prizeInfo.amazonLink, "\" class=\"cta-button\">Claim Your Prize on Amazon</a>\n            </p>\n            ") : '', "\n\n            ").concat(prizeInfo.expiresAt ? "\n            <div class=\"expiry\">\n              <strong>\u23F0 Important:</strong> This offer expires on ".concat(prizeInfo.expiresAt.toLocaleDateString(), ".\n            </div>\n            ") : '', "\n\n            <h3>How to Redeem:</h3>\n            <ol>\n              <li>Click the button above to visit our Amazon store</li>\n              <li>Add eligible products to your cart</li>\n              <li>Your discount will be automatically applied</li>\n              <li>Complete your purchase before the expiration date</li>\n            </ol>\n\n            <p>Thank you for being a valued customer!</p>\n          </div>\n          <div class=\"footer\" style=\"text-align: center; margin-top: 20px; font-size: 12px; color: #666;\">\n            <p>\u00A9 2025 Infinity Vault Cards. All rights reserved.</p>\n            <p>Questions? Contact us at support@infinityvaultcards.com</p>\n          </div>\n        </div>\n      </body>\n      </html>\n    ");
                        text = "\nCongratulations! You've Won ".concat(prizeInfo.prizeLabel, "!\n\nYou've successfully claimed your prize from our Scratch & Win promotion!\n\n").concat(prizeInfo.amazonLink ? "Claim your prize: ".concat(prizeInfo.amazonLink) : '', "\n\n").concat(prizeInfo.expiresAt ? "This offer expires on ".concat(prizeInfo.expiresAt.toLocaleDateString(), ".") : '', "\n\nHow to Redeem:\n1. Visit our Amazon store using the link above\n2. Add eligible products to your cart\n3. Your discount will be automatically applied\n4. Complete your purchase before the expiration date\n\nThank you for being a valued customer!\n\n\u00A9 2025 Infinity Vault Cards\n    ");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sendEmail(email, subject, html, text)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Error sending prize notification:', error_2);
                        return [2 /*return*/, {
                                success: false,
                                message: 'Failed to send prize notification'
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Send approval status update email
     */
    EmailService.prototype.sendApprovalStatusEmail = function (email, status, reason) {
        return __awaiter(this, void 0, void 0, function () {
            var subject, html, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subject = status === 'approved'
                            ? '✅ Your Order Has Been Verified!'
                            : '❌ Order Verification Update';
                        html = status === 'approved' ? "\n      <h2>Great News!</h2>\n      <p>Your Amazon Order ID has been verified and your prize is ready to claim!</p>\n      <p>Check your account to access your promotional links.</p>\n    " : "\n      <h2>Order Verification Update</h2>\n      <p>We were unable to verify your Amazon Order ID.</p>\n      <p>Reason: ".concat(reason || 'Order ID not found in our system', "</p>\n      <p>Please double-check your Order ID and try again, or contact support for assistance.</p>\n    ");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sendEmail(email, subject, html)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_3 = _a.sent();
                        console.error('Error sending approval status email:', error_3);
                        return [2 /*return*/, {
                                success: false,
                                message: 'Failed to send status update email'
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Core email sending method
     */
    EmailService.prototype.sendEmail = function (to, subject, html, text) {
        return __awaiter(this, void 0, void 0, function () {
            var from, _a, msg, error_4, errorMessage;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        from = process.env.FROM_EMAIL || 'noreply@infinityvaultcards.com';
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 8, , 9]);
                        _a = this.provider;
                        switch (_a) {
                            case 'sendgrid': return [3 /*break*/, 2];
                            case 'smtp': return [3 /*break*/, 4];
                            case 'mock': return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 6];
                    case 2:
                        msg = {
                            to: to,
                            from: from,
                            subject: subject,
                            text: text || this.htmlToText(html),
                            html: html
                        };
                        return [4 /*yield*/, mail_1.default.send(msg)];
                    case 3:
                        _e.sent();
                        console.log("Email sent via SendGrid to ".concat(to));
                        return [2 /*return*/, { success: true, message: 'Email sent successfully' }];
                    case 4:
                        if (!this.transporter) {
                            throw new Error('SMTP transporter not initialized');
                        }
                        return [4 /*yield*/, this.transporter.sendMail({
                                from: from,
                                to: to,
                                subject: subject,
                                text: text || this.htmlToText(html),
                                html: html
                            })];
                    case 5:
                        _e.sent();
                        console.log("Email sent via SMTP to ".concat(to));
                        return [2 /*return*/, { success: true, message: 'Email sent successfully' }];
                    case 6:
                        console.log("[Mock Email] To: ".concat(to));
                        console.log("[Mock Email] Subject: ".concat(subject));
                        console.log("[Mock Email] Content: ".concat(text || 'HTML email'));
                        return [2 /*return*/, { success: true, message: 'Mock email sent (email service not configured)' }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_4 = _e.sent();
                        console.error('Email send error:', error_4);
                        // Handle specific SendGrid errors
                        if ((_c = (_b = error_4.response) === null || _b === void 0 ? void 0 : _b.body) === null || _c === void 0 ? void 0 : _c.errors) {
                            errorMessage = ((_d = error_4.response.body.errors[0]) === null || _d === void 0 ? void 0 : _d.message) || 'Email delivery failed';
                            return [2 /*return*/, { success: false, message: errorMessage }];
                        }
                        return [2 /*return*/, { success: false, message: 'Failed to send email' }];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Simple HTML to text converter
     */
    EmailService.prototype.htmlToText = function (html) {
        return html
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    };
    return EmailService;
}());
exports.EmailService = EmailService;
