import { Module } from '@nestjs/common';
import { AzureEmailService } from './email/azure-email.service';
import { IEmailService } from './interfaces/email.interface';

@Module({
  providers: [
    {
      provide: IEmailService,
      useClass: AzureEmailService,
    },
  ],
  exports: [IEmailService],
})
export class IntegrationsModule {}
