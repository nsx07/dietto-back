import { Module } from '@nestjs/common';
import { AzureEmailService } from './email/azure-email.service';
import { IEmailService } from './interfaces/email.interface';
import { ICFNService } from './interfaces/cfn.interface';
import { CFNService } from './cfn/cfn.service';

@Module({
  providers: [
    {
      provide: IEmailService,
      useClass: AzureEmailService,
    },
    {
      provide: ICFNService,
      useClass: CFNService,
    },
  ],
  exports: [IEmailService, ICFNService],
})
export class IntegrationsModule {}
