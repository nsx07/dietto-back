import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';
import { UserController } from './controllers/user.controller';
import { UserService } from '@/application/services/user/user.service';
import { IUserService } from '@/application/services/contract/iuser.service';
import { SecurityModule } from '../security/security.module';
import { LoginUseCase } from '@/application/use-cases/user/login-use-case/login-use-case';
import { SignUpUseCase } from '@/application/use-cases/user/signup-use-case/signup-use-case';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [PersistenceModule, SecurityModule],
  controllers: [UserController, AuthController],
  // exports: [UserController],
  providers: [
    {
      provide: IUserService,
      useClass: UserService,
    },
    LoginUseCase,
    SignUpUseCase,
  ],
})
export class HttpModule {}
