import { Injectable } from '@nestjs/common';
import { IUserService } from '@/application/services/contract/iuser.service';
import { JwtService } from '@nestjs/jwt';
import { UserException } from '@/application/exceptions/user.exception';
import { BcryptService } from '@/infra/security/bcrypt/bcrypt.service';
import { UseCase } from '@/application/use-cases/use-case';
import { ResponseDto } from '@/shared/utils/response-dto';

export interface LoginUseCaseRequest {
  email: string;
  password: string;
}

export interface LoginUseCaseResponse {
  token: string;
}

@Injectable()
export class LoginUseCase
  implements UseCase<LoginUseCaseRequest, ResponseDto<LoginUseCaseResponse>>
{
  constructor(
    private readonly userService: IUserService,
    private readonly bCrypt: BcryptService,
    private jwt: JwtService,
  ) {}

  async execute(
    request: LoginUseCaseRequest,
  ): Promise<ResponseDto<LoginUseCaseResponse>> {
    const user = await this.userService.getCredentials(request.email);

    if (!user) {
      throw UserException.notFound();
    }

    if (!(await this.bCrypt.compare(request.password, user!.passwordHash))) {
      throw UserException.invalidPassword();
    }

    const token = await this.jwt.signAsync(
      { userId: user!.id, email: user!.email, name: user!.name },
      {
        mutatePayload: false,
      },
    );

    return ResponseDto.success<LoginUseCaseResponse>(
      { token },
      'Login realizado com sucesso!',
    );
  }
}
