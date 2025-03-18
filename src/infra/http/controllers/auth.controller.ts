import {
  ResetPasswordUseCase,
  ResetPasswordUseCaseRequest,
} from '@/application/use-cases/auth/reset-password-use-case/reset-password-use-case';
import {
  SendResetPasswordUseCase,
  SendResetPasswordUseCaseRequest,
} from '@/application/use-cases/auth/send-reset-password-use-case/send-reset-password-use-case';
import {
  LoginUseCase,
  LoginUseCaseRequest,
} from '@/application/use-cases/auth/login-use-case/login-use-case';
import {
  SignUpUseCase,
  SignUpUseCaseRequest,
} from '@/application/use-cases/auth/signup-use-case/signup-use-case';
import { Public } from '@/shared/decorators/public.metadata';
import { Body, Controller, Headers, Post, Req } from '@nestjs/common';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly signUpUseCase: SignUpUseCase,
    private readonly sendResetPasswordUseCase: SendResetPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  @Post('login')
  @Public()
  async login(
    @Body() body: LoginUseCaseRequest,
    @Headers('x-origin-ip') ipInfo: string,
  ) {
    return this.loginUseCase.execute({
      ...body,
      ipInfo,
    });
  }

  @Post('signup')
  @Public()
  async signUp(@Body() body: SignUpUseCaseRequest) {
    return this.signUpUseCase.execute(body);
  }

  @Post('send-reset-password')
  @Public()
  async sendResetPassword(
    @Body() body: SendResetPasswordUseCaseRequest,
    @Headers('origin') origin: string,
  ) {
    return this.sendResetPasswordUseCase.execute({
      email: body.email,
      origin,
    });
  }

  @Post('reset-password')
  @Public()
  async resetPassword(@Body() body: ResetPasswordUseCaseRequest) {
    return this.resetPasswordUseCase.execute(body);
  }
}
