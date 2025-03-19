import { Injectable } from '@nestjs/common';
import { IUserService } from '@/application/services/contract/iuser.service';
import { JwtService } from '@nestjs/jwt';
import { UserException } from '@/application/exceptions/user.exception';
import { BcryptService } from '@/infra/security/bcrypt/bcrypt.service';
import { UseCase } from '@/application/use-cases/use-case';
import { ResponseDto } from '@/shared/utils/response-dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { reverse } from '@/shared/utils/tools';

export interface IpInfo {
  ip: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

export class LoginUseCaseRequest {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  ipInfo: string;
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
    const ipInfo: IpInfo = JSON.parse(
      Buffer.from(reverse(request.ipInfo), 'base64').toString(),
    );

    const user = await this.userService.getCredentials(request.email);

    if (!user) {
      throw UserException.notFound();
    }

    if (!(await this.bCrypt.compare(request.password, user!.password))) {
      throw UserException.invalidPassword();
    }

    const token = await this.jwt.signAsync(
      {
        userId: user!.id,
        email: user!.email,
        name: user!.name,
        role: user!.role,
      },
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
