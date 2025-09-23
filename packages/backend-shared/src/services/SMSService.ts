import twilio from 'twilio';

export class SMSService {
  private client: twilio.Twilio | null = null;
  private verifyServiceSid: string | null = null;
  private readonly isEnabled: boolean;

  constructor() {
    // Check if Twilio is configured
    this.isEnabled = !!(
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_PHONE_NUMBER
    );

    if (this.isEnabled) {
      this.client = twilio(
        process.env.TWILIO_ACCOUNT_SID!,
        process.env.TWILIO_AUTH_TOKEN!
      );
      this.verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID || null;

      console.log('SMS Service initialized with Twilio');
    } else {
      console.warn('SMS Service: Twilio credentials not configured. SMS features disabled.');
    }
  }

  /**
   * Send verification code via SMS using Twilio Verify
   */
  async sendVerificationCode(phoneNumber: string): Promise<{ success: boolean; sid?: string; message: string }> {
    if (!this.isEnabled) {
      console.log(`[SMS Mock] Would send verification code to ${phoneNumber}`);
      return {
        success: true,
        sid: 'mock_verification_sid',
        message: 'SMS service not configured. Mock send successful.'
      };
    }

    try {
      // Validate phone number format
      if (!this.isValidPhoneNumber(phoneNumber)) {
        return {
          success: false,
          message: 'Invalid phone number format. Please use E.164 format (e.g., +1234567890)'
        };
      }

      // Use Twilio Verify service if configured
      if (this.verifyServiceSid && this.client) {
        const verification = await this.client.verify.v2
          .services(this.verifyServiceSid)
          .verifications.create({
            to: phoneNumber,
            channel: 'sms'
          });

        console.log(`SMS verification sent to ${phoneNumber}, SID: ${verification.sid}`);

        return {
          success: true,
          sid: verification.sid,
          message: 'Verification code sent successfully'
        };
      }

      // Fallback to regular SMS if Verify service not configured
      if (this.client) {
        const code = this.generateCode();
        const message = await this.client.messages.create({
          body: `Your Infinity Vault Cards verification code is: ${code}`,
          from: process.env.TWILIO_PHONE_NUMBER!,
          to: phoneNumber
        });

        console.log(`SMS sent to ${phoneNumber}, Message SID: ${message.sid}`);

        return {
          success: true,
          sid: message.sid,
          message: 'Verification code sent successfully'
        };
      }

      return {
        success: false,
        message: 'SMS service not properly configured'
      };

    } catch (error: any) {
      console.error('Error sending SMS:', error);

      // Handle specific Twilio errors
      if (error.code === 21211) {
        return {
          success: false,
          message: 'Invalid phone number. Please check the number and try again.'
        };
      }

      if (error.code === 21608) {
        return {
          success: false,
          message: 'Phone number is not verified with Twilio (trial account limitation)'
        };
      }

      return {
        success: false,
        message: 'Failed to send verification code. Please try again.'
      };
    }
  }

  /**
   * Verify SMS code using Twilio Verify
   */
  async verifyCode(phoneNumber: string, code: string): Promise<{ valid: boolean; message: string }> {
    if (!this.isEnabled) {
      console.log(`[SMS Mock] Would verify code ${code} for ${phoneNumber}`);
      // Accept any 6-digit code in mock mode
      const valid = /^\d{6}$/.test(code);
      return {
        valid,
        message: valid ? 'Mock verification successful' : 'Invalid code format'
      };
    }

    try {
      if (!this.verifyServiceSid || !this.client) {
        // If Verify service not configured, we can't verify
        // In production, this should integrate with OTP service
        return {
          valid: false,
          message: 'Verification service not configured'
        };
      }

      const verificationCheck = await this.client.verify.v2
        .services(this.verifyServiceSid)
        .verificationChecks.create({
          to: phoneNumber,
          code: code
        });

      const valid = verificationCheck.status === 'approved';

      console.log(`SMS verification for ${phoneNumber}: ${verificationCheck.status}`);

      return {
        valid,
        message: valid ? 'Phone number verified successfully' : 'Invalid verification code'
      };

    } catch (error: any) {
      console.error('Error verifying SMS code:', error);

      if (error.code === 20404) {
        return {
          valid: false,
          message: 'Verification code expired or not found'
        };
      }

      return {
        valid: false,
        message: 'Verification failed. Please try again.'
      };
    }
  }

  /**
   * Send a custom SMS message
   */
  async sendSMS(phoneNumber: string, message: string): Promise<{ success: boolean; sid?: string; message: string }> {
    if (!this.isEnabled || !this.client) {
      console.log(`[SMS Mock] Would send to ${phoneNumber}: ${message}`);
      return {
        success: true,
        sid: 'mock_message_sid',
        message: 'SMS service not configured. Mock send successful.'
      };
    }

    try {
      const sms = await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER!,
        to: phoneNumber
      });

      console.log(`Custom SMS sent to ${phoneNumber}, SID: ${sms.sid}`);

      return {
        success: true,
        sid: sms.sid,
        message: 'SMS sent successfully'
      };

    } catch (error: any) {
      console.error('Error sending custom SMS:', error);
      return {
        success: false,
        message: 'Failed to send SMS'
      };
    }
  }

  /**
   * Validate phone number format (E.164)
   */
  private isValidPhoneNumber(phoneNumber: string): boolean {
    // E.164 format: + followed by country code and number
    // Length should be between 10 and 15 digits total
    const e164Regex = /^\+[1-9]\d{1,14}$/;
    return e164Regex.test(phoneNumber);
  }

  /**
   * Generate a 6-digit verification code
   */
  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Format phone number to E.164 format
   */
  formatPhoneNumber(phoneNumber: string, defaultCountryCode: string = '+1'): string {
    // Remove all non-digit characters
    let cleaned = phoneNumber.replace(/\D/g, '');

    // If number doesn't start with country code, add default
    if (!phoneNumber.startsWith('+')) {
      // US phone numbers
      if (defaultCountryCode === '+1' && cleaned.length === 10) {
        cleaned = '1' + cleaned;
      }
      return defaultCountryCode + cleaned;
    }

    return '+' + cleaned;
  }
}