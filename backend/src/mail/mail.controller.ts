// mail.controller.ts
import { Controller, Get } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('test-mail')
export class MailController {
  constructor(private readonly mailerService: MailerService) {}

  @Get()
  async sendTestMail() {
    await this.mailerService.sendMail({
      to: 'ggitlearner@gmail.com',
      subject: '🚀 Test Email from Backend',
      text: 'Your email configuration is working!',
    });

    return { success: true };
  }
}
