import { Injectable } from '@nestjs/common';
import { UseCase } from '../../use-case';
import { IsString } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/application/services/user/user.service';
import { IUserService } from '@/application/services/contract/iuser.service';
import { ResponseDto } from '@/shared/utils/response-dto';

export class ResetPasswordUseCaseRequest {
  @IsString()
  token: string;

  @IsString()
  password: string;

  @IsString()
  newPassword: string;
}

export interface ResetPasswordUseCaseResponse {
  message: string;
  success: boolean;
}

@Injectable()
export class ResetPasswordUseCase
  implements
    UseCase<
      ResetPasswordUseCaseRequest,
      ResponseDto<ResetPasswordUseCaseResponse>
    >
{
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: IUserService,
  ) {}

  async execute(
    request: ResetPasswordUseCaseRequest,
  ): Promise<ResponseDto<ResetPasswordUseCaseResponse>> {
    const tokenData = this.jwt.decode(request.token, {
      json: true,
      complete: true,
    });

    if (tokenData.payload.exp < Date.now()) {
      return ResponseDto.error('Token expired');
    }

    await this.userService.updateUserCredentials({
      id: tokenData.payload.id,
      password: request.password,
    });

    return ResponseDto.success({ message: 'Password updated', success: true });
  }
}
