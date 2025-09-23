export declare class SMSService {
    private client;
    private verifyServiceSid;
    private readonly isEnabled;
    constructor();
    /**
     * Send verification code via SMS using Twilio Verify
     */
    sendVerificationCode(phoneNumber: string): Promise<{
        success: boolean;
        sid?: string;
        message: string;
    }>;
    /**
     * Verify SMS code using Twilio Verify
     */
    verifyCode(phoneNumber: string, code: string): Promise<{
        valid: boolean;
        message: string;
    }>;
    /**
     * Send a custom SMS message
     */
    sendSMS(phoneNumber: string, message: string): Promise<{
        success: boolean;
        sid?: string;
        message: string;
    }>;
    /**
     * Validate phone number format (E.164)
     */
    private isValidPhoneNumber;
    /**
     * Generate a 6-digit verification code
     */
    private generateCode;
    /**
     * Format phone number to E.164 format
     */
    formatPhoneNumber(phoneNumber: string, defaultCountryCode?: string): string;
}
