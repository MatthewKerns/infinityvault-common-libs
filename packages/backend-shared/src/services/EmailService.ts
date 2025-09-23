import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

export class EmailService {
  private readonly provider: 'sendgrid' | 'smtp' | 'mock';
  private transporter: any = null;

  constructor() {
    // Determine which email provider to use based on environment variables
    if (process.env.SENDGRID_API_KEY) {
      this.provider = 'sendgrid';
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      console.log('Email Service initialized with SendGrid');
    } else if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
      this.provider = 'smtp';
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      console.log('Email Service initialized with SMTP');
    } else {
      this.provider = 'mock';
      console.warn('Email Service: No email provider configured. Using mock mode.');
    }
  }

  /**
   * Send OTP verification email
   */
  async sendOTPEmail(email: string, code: string): Promise<{ success: boolean; message: string }> {
    const subject = 'Your Infinity Vault Cards Verification Code';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .code-box { background: white; border: 2px solid #667eea; border-radius: 8px; padding: 15px; text-align: center; margin: 20px 0; }
          .code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          .warning { background: #fff3cd; border: 1px solid #ffc107; border-radius: 5px; padding: 10px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Infinity Vault Cards</h1>
            <p>Email Verification</p>
          </div>
          <div class="content">
            <h2>Verify Your Email Address</h2>
            <p>Thank you for participating in our Scratch & Win promotion!</p>
            <p>Please enter the following verification code to continue:</p>

            <div class="code-box">
              <div class="code">${code}</div>
            </div>

            <p><strong>This code expires in 10 minutes.</strong></p>

            <div class="warning">
              <strong>⚠️ Security Notice:</strong> Never share this code with anyone. Infinity Vault Cards staff will never ask for this code.
            </div>

            <p>If you didn't request this code, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>© 2025 Infinity Vault Cards. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Infinity Vault Cards - Email Verification

Your verification code is: ${code}

This code expires in 10 minutes.

If you didn't request this code, please ignore this email.

© 2025 Infinity Vault Cards
    `;

    try {
      const result = await this.sendEmail(email, subject, html, text);
      return result;
    } catch (error) {
      console.error('Error sending OTP email:', error);
      return {
        success: false,
        message: 'Failed to send verification email'
      };
    }
  }

  /**
   * Send prize notification email
   */
  async sendPrizeNotification(email: string, prizeInfo: {
    prizeType: string;
    prizeLabel: string;
    amazonLink?: string;
    expiresAt?: Date;
  }): Promise<{ success: boolean; message: string }> {
    const subject = `🎉 Congratulations! You've Won ${prizeInfo.prizeLabel}!`;
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .prize-box { background: white; border: 3px solid #ffd700; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0; }
          .prize-text { font-size: 28px; font-weight: bold; color: #ff8c00; }
          .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin-top: 20px; }
          .expiry { background: #fff3cd; border: 1px solid #ffc107; border-radius: 5px; padding: 10px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎊 WINNER! 🎊</h1>
            <p>Infinity Vault Cards Scratch & Win</p>
          </div>
          <div class="content">
            <h2>Congratulations!</h2>
            <p>You've successfully claimed your prize from our Scratch & Win promotion!</p>

            <div class="prize-box">
              <div class="prize-text">You Won: ${prizeInfo.prizeLabel}</div>
            </div>

            ${prizeInfo.amazonLink ? `
            <p style="text-align: center;">
              <a href="${prizeInfo.amazonLink}" class="cta-button">Claim Your Prize on Amazon</a>
            </p>
            ` : ''}

            ${prizeInfo.expiresAt ? `
            <div class="expiry">
              <strong>⏰ Important:</strong> This offer expires on ${prizeInfo.expiresAt.toLocaleDateString()}.
            </div>
            ` : ''}

            <h3>How to Redeem:</h3>
            <ol>
              <li>Click the button above to visit our Amazon store</li>
              <li>Add eligible products to your cart</li>
              <li>Your discount will be automatically applied</li>
              <li>Complete your purchase before the expiration date</li>
            </ol>

            <p>Thank you for being a valued customer!</p>
          </div>
          <div class="footer" style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
            <p>© 2025 Infinity Vault Cards. All rights reserved.</p>
            <p>Questions? Contact us at support@infinityvaultcards.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Congratulations! You've Won ${prizeInfo.prizeLabel}!

You've successfully claimed your prize from our Scratch & Win promotion!

${prizeInfo.amazonLink ? `Claim your prize: ${prizeInfo.amazonLink}` : ''}

${prizeInfo.expiresAt ? `This offer expires on ${prizeInfo.expiresAt.toLocaleDateString()}.` : ''}

How to Redeem:
1. Visit our Amazon store using the link above
2. Add eligible products to your cart
3. Your discount will be automatically applied
4. Complete your purchase before the expiration date

Thank you for being a valued customer!

© 2025 Infinity Vault Cards
    `;

    try {
      const result = await this.sendEmail(email, subject, html, text);
      return result;
    } catch (error) {
      console.error('Error sending prize notification:', error);
      return {
        success: false,
        message: 'Failed to send prize notification'
      };
    }
  }

  /**
   * Send approval status update email
   */
  async sendApprovalStatusEmail(email: string, status: 'approved' | 'rejected', reason?: string): Promise<{ success: boolean; message: string }> {
    const subject = status === 'approved'
      ? '✅ Your Order Has Been Verified!'
      : '❌ Order Verification Update';

    const html = status === 'approved' ? `
      <h2>Great News!</h2>
      <p>Your Amazon Order ID has been verified and your prize is ready to claim!</p>
      <p>Check your account to access your promotional links.</p>
    ` : `
      <h2>Order Verification Update</h2>
      <p>We were unable to verify your Amazon Order ID.</p>
      <p>Reason: ${reason || 'Order ID not found in our system'}</p>
      <p>Please double-check your Order ID and try again, or contact support for assistance.</p>
    `;

    try {
      const result = await this.sendEmail(email, subject, html);
      return result;
    } catch (error) {
      console.error('Error sending approval status email:', error);
      return {
        success: false,
        message: 'Failed to send status update email'
      };
    }
  }

  /**
   * Core email sending method
   */
  private async sendEmail(to: string, subject: string, html: string, text?: string): Promise<{ success: boolean; message: string }> {
    const from = process.env.FROM_EMAIL || 'noreply@infinityvaultcards.com';

    try {
      switch (this.provider) {
        case 'sendgrid':
          const msg = {
            to,
            from,
            subject,
            text: text || this.htmlToText(html),
            html
          };
          await sgMail.send(msg);
          console.log(`Email sent via SendGrid to ${to}`);
          return { success: true, message: 'Email sent successfully' };

        case 'smtp':
          if (!this.transporter) {
            throw new Error('SMTP transporter not initialized');
          }
          await this.transporter.sendMail({
            from,
            to,
            subject,
            text: text || this.htmlToText(html),
            html
          });
          console.log(`Email sent via SMTP to ${to}`);
          return { success: true, message: 'Email sent successfully' };

        case 'mock':
        default:
          console.log(`[Mock Email] To: ${to}`);
          console.log(`[Mock Email] Subject: ${subject}`);
          console.log(`[Mock Email] Content: ${text || 'HTML email'}`);
          return { success: true, message: 'Mock email sent (email service not configured)' };
      }
    } catch (error: any) {
      console.error('Email send error:', error);

      // Handle specific SendGrid errors
      if (error.response?.body?.errors) {
        const errorMessage = error.response.body.errors[0]?.message || 'Email delivery failed';
        return { success: false, message: errorMessage };
      }

      return { success: false, message: 'Failed to send email' };
    }
  }

  /**
   * Simple HTML to text converter
   */
  private htmlToText(html: string): string {
    return html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
}