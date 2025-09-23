export declare class EmailService {
    private readonly provider;
    private transporter;
    constructor();
    /**
     * Send OTP verification email
     */
    sendOTPEmail(email: string, code: string): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Send prize notification email
     */
    sendPrizeNotification(email: string, prizeInfo: {
        prizeType: string;
        prizeLabel: string;
        amazonLink?: string;
        expiresAt?: Date;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Send approval status update email
     */
    sendApprovalStatusEmail(email: string, status: 'approved' | 'rejected', reason?: string): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Core email sending method
     */
    private sendEmail;
    /**
     * Simple HTML to text converter
     */
    private htmlToText;
}
