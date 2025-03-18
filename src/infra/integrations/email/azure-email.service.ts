import { Injectable, OnModuleInit } from '@nestjs/common';
import { IEmailService } from '../interfaces/email.interface';
import { EmailClient } from '@azure/communication-email';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureEmailService implements IEmailService, OnModuleInit {
  private client: EmailClient;

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    this.client = new EmailClient(
      this.config.get('AZURE_COMM_CONNECTION_STRING') as string,
    );
  }

  async sendEmail(email: string, subject: string, message: string) {
    return await this.client
      .beginSend({
        content: {
          subject,
          html: message,
        },
        recipients: {
          to: [
            {
              address: email,
            },
          ],
        },
        senderAddress: this.config.get('AZURE_COMM_SENDER_EMAIL') as string,
      })
      .then(async (response) => await response.pollUntilDone())
      .then((response) => ({
        success: response.status === 'Succeeded',
        id: response.id,
      }))
      .catch((error) => ({
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      }));
  }
}
