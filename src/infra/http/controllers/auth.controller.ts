import {
  LoginUseCase,
  LoginUseCaseRequest,
} from '@/application/use-cases/user/login-use-case/login-use-case';
import {
  SignUpUseCase,
  SignUpUseCaseRequest,
} from '@/application/use-cases/user/signup-use-case/signup-use-case';
import { Public } from '@/shared/decorators/public.metadata';
import { Body, Controller, Header, Headers, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly signUpUseCase: SignUpUseCase,
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
}
