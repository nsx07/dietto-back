import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';
import { UserController } from './controllers/user.controller';
import { UserService } from '@/application/services/user/user.service';
import { IUserService } from '@/application/services/contract/iuser.service';
import { SecurityModule } from '../security/security.module';
import { LoginUseCase } from '@/application/use-cases/auth/login-use-case/login-use-case';
import { SignUpUseCase } from '@/application/use-cases/auth/signup-use-case/signup-use-case';
import { AuthController } from './controllers/auth.controller';
import { IntegrationsModule } from '../integrations/integrations.module';
import { SendResetPasswordUseCase } from '@/application/use-cases/auth/send-reset-password-use-case/send-reset-password-use-case';
import { ResetPasswordUseCase } from '@/application/use-cases/auth/reset-password-use-case/reset-password-use-case';

@Module({
  imports: [PersistenceModule, SecurityModule, IntegrationsModule],
  controllers: [UserController, AuthController],
  providers: [
    {
      provide: IUserService,
      useClass: UserService,
    },
    LoginUseCase,
    SignUpUseCase,
    SendResetPasswordUseCase,
    ResetPasswordUseCase,
  ],
})
export class HttpModule {}
