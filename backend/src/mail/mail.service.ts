import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

export interface SendVerificationEmailParams {
  to: string;
  name: string;
  verificationCode: string;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationEmail(
    params: SendVerificationEmailParams,
  ): Promise<boolean> {
    const { to, name, verificationCode } = params;

    this.logger.log(`Attempting to send verification email to: ${to}`);

    try {
      const result = await this.mailerService.sendMail({
        to,
        subject: 'Verify Your GitLearner Account',
        template: 'verification-email',
        context: {
          name,
          verificationCode,
          email: to,
          currentYear: new Date().getFullYear(),
        },
      });
      this.logger.log(`Verification email sent successfully to: ${to}`);
      this.logger.debug(`Mail result: ${JSON.stringify(result)}`);
      return true;
    } catch (error: unknown) {
      const err = error as Error;
      this.logger.error(`Failed to send verification email to: ${to}`);
      this.logger.error(`Error details: ${err.message}`);
      if (err.stack) {
        this.logger.error(`Stack trace: ${err.stack}`);
      }
      throw error; // Re-throw so the caller knows it failed
    }
  }
}
