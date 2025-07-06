const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendOTP(email, otp, fullName = '') {
    try {
      // For development: Skip actual email sending and use dummy response
      if (process.env.NODE_ENV === 'development' && (!process.env.SMTP_USER || process.env.SMTP_USER === 'your-email@gmail.com')) {
        console.log(`[DEV MODE] OTP for ${email}: ${otp}`);
        console.log(`[DEV MODE] Use OTP: ${otp} to verify ${email}`);
        return { 
          success: true, 
          messageId: 'dev-mode-' + Date.now(),
          isDevelopmentMode: true 
        };
      }

      const mailOptions = {
        from: `"Dyanpitt" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Your Dyanpitt Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to Dyanpitt!</h2>
            <p>Hello ${fullName || 'there'},</p>
            <p>Thank you for registering with Dyanpitt. Please use the following verification code to complete your registration:</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h1 style="color: #515151; font-size: 32px; margin: 0; letter-spacing: 4px;">${otp}</h1>
            </div>
            
            <p style="color: #666;">This code will expire in 30 minutes.</p>
            <p style="color: #666;">If you didn't request this code, please ignore this email.</p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #999; font-size: 12px;">
              This is an automated message from Dyanpitt. Please do not reply to this email.
            </p>
          </div>
        `,
        text: `
          Welcome to Dyanpitt!
          
          Your verification code is: ${otp}
          
          This code will expire in 30 minutes.
          If you didn't request this code, please ignore this email.
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('OTP email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending OTP email:', error);
      return { success: false, error: error.message };
    }
  }

  async sendWelcomeEmail(email, fullName, dyanpittId) {
    try {
      // For development: Skip actual email sending and use dummy response
      if (process.env.NODE_ENV === 'development' && (!process.env.SMTP_USER || process.env.SMTP_USER === 'your-email@gmail.com')) {
        console.log(`[DEV MODE] Welcome email for ${email} with Dyanpitt ID: ${dyanpittId}`);
        return { 
          success: true, 
          messageId: 'dev-mode-welcome-' + Date.now(),
          isDevelopmentMode: true 
        };
      }

      const mailOptions = {
        from: `"Dyanpitt" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Welcome to Dyanpitt - Your Account is Ready!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to Dyanpitt, ${fullName}!</h2>
            <p>Congratulations! Your account has been successfully created.</p>
            
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border: 2px solid #0ea5e9; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Dyanpitt ID</h3>
              <p style="font-family: 'Courier New', monospace; font-size: 24px; font-weight: bold; color: #0ea5e9; margin: 10px 0;">${dyanpittId}</p>
              <p style="color: #666; font-size: 14px; margin-bottom: 0;">You can use this ID to login along with your password.</p>
            </div>
            
            <h3 style="color: #333;">Getting Started</h3>
            <ul style="color: #666;">
              <li>You can login using either your email or Dyanpitt ID</li>
              <li>Keep your Dyanpitt ID safe - it's your unique identifier</li>
              <li>Explore all the features available in your dashboard</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" 
                 style="background-color: #515151; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
                Login to Your Account
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #999; font-size: 12px;">
              This is an automated message from Dyanpitt. Please do not reply to this email.
            </p>
          </div>
        `,
        text: `
          Welcome to Dyanpitt, ${fullName}!
          
          Your account has been successfully created.
          Your Dyanpitt ID: ${dyanpittId}
          
          You can use this ID to login along with your password.
          
          Visit ${process.env.FRONTEND_URL || 'http://localhost:5173'} to login to your account.
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error: error.message };
    }
  }

  async sendPasswordResetEmail(email, resetToken, fullName) {
    try {
      // For development: Skip actual email sending and use dummy response
      if (process.env.NODE_ENV === 'development' && (!process.env.SMTP_USER || process.env.SMTP_USER === 'your-email@gmail.com')) {
        console.log(`[DEV MODE] Password reset email for ${email} with token: ${resetToken}`);
        return { 
          success: true, 
          messageId: 'dev-mode-reset-' + Date.now(),
          isDevelopmentMode: true 
        };
      }

      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
      
      const mailOptions = {
        from: `"Dyanpitt" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Reset Your Dyanpitt Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>Hello ${fullName || 'there'},</p>
            <p>We received a request to reset your password for your Dyanpitt account.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #515151; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #666;">This link will expire in 1 hour.</p>
            <p style="color: #666;">If you didn't request this password reset, please ignore this email.</p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #999; font-size: 12px;">
              This is an automated message from Dyanpitt. Please do not reply to this email.
            </p>
          </div>
        `,
        text: `
          Password Reset Request
          
          We received a request to reset your password for your Dyanpitt account.
          
          Click the following link to reset your password: ${resetUrl}
          
          This link will expire in 1 hour.
          If you didn't request this password reset, please ignore this email.
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Password reset email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return { success: false, error: error.message };
    }
  }

  async sendPasswordResetOTP(email, otp, fullName = '') {
    try {
      // For development: Skip actual email sending and use dummy response
      if (process.env.NODE_ENV === 'development' && (!process.env.SMTP_USER || process.env.SMTP_USER === 'your-email@gmail.com')) {
        console.log(`[DEV MODE] Password reset OTP for ${email}: ${otp}`);
        console.log(`[DEV MODE] Use OTP: ${otp} to reset password for ${email}`);
        return { 
          success: true, 
          messageId: 'dev-mode-reset-otp-' + Date.now(),
          isDevelopmentMode: true 
        };
      }

      const mailOptions = {
        from: `"Dyanpitt" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Your Dyanpitt Password Reset Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>Hello ${fullName || 'there'},</p>
            <p>We received a request to reset your password for your Dyanpitt account. Please use the following verification code to proceed:</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h1 style="color: #515151; font-size: 32px; margin: 0; letter-spacing: 4px;">${otp}</h1>
            </div>
            
            <p style="color: #666;">This code will expire in 30 minutes.</p>
            <p style="color: #666;">If you didn't request this password reset, please ignore this email and your password will remain unchanged.</p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #999; font-size: 12px;">
              This is an automated message from Dyanpitt. Please do not reply to this email.
            </p>
          </div>
        `,
        text: `
          Password Reset Request
          
          Your password reset verification code is: ${otp}
          
          This code will expire in 30 minutes.
          If you didn't request this password reset, please ignore this email.
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Password reset OTP email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending password reset OTP email:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new EmailService();