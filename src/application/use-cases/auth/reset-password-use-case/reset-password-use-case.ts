import { Injectable } from '@nestjs/common';
import { UseCase } from '../../use-case';
import { IsString } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/application/services/user/user.service';
import { IUserService } from '@/application/services/contract/iuser.service';

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
  implements UseCase<ResetPasswordUseCaseRequest, ResetPasswordUseCaseResponse>
{
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: IUserService,
  ) {}

  async execute(
    request: ResetPasswordUseCaseRequest,
  ): Promise<ResetPasswordUseCaseResponse> {
    const tokenData = this.jwt.decode(request.token, {
      json: true,
      complete: true,
    });

    if (tokenData.payload.exp < Date.now()) {
      return {
        message: 'Token expired',
        success: false,
      };
    }

    await this.userService.updateUserCredentials({
      id: tokenData.payload.id,
      password: request.password,
    });

    return {
      message: 'Password reseted',
      success: true,
    };
  }
}
