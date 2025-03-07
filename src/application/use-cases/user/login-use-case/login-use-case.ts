import { Injectable } from '@nestjs/common';
import { IUserService } from '@/application/services/contract/iuser.service';
import { JwtService } from '@nestjs/jwt';
import { UserException } from '@/application/exceptions/user.exception';
import { BcryptService } from '@/infra/security/bcrypt/bcrypt.service';
import { UseCase } from '@/application/use-cases/use-case';

export interface LoginUseCaseRequest {
  email: string;
  password: string;
}

@Injectable()
export class LoginUseCase implements UseCase<LoginUseCaseRequest, string> {
  constructor(
    private readonly userService: IUserService,
    private readonly bCrypt: BcryptService,
    private jwt: JwtService,
  ) {}

  async execute(request: LoginUseCaseRequest): Promise<string> {
    const user = await this.userService.getCredentials(request.email);

    if (!user) {
      UserException.notFound();
    }

    if (!(await this.bCrypt.compare(request.password, user!.passwordHash))) {
      UserException.invalidPassword();
    }

    return await this.jwt.signAsync(
      { id: user!.id, email: user!.email },
      {
        mutatePayload: false,
      },
    );
  }
}
