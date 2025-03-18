import { Injectable } from '@nestjs/common';
import { UseCase } from '../../use-case';
import { IEmailService } from '@/infra/integrations/interfaces/email.interface';
import { UserRepository } from '@/application/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendResetPasswordUseCaseRequest {
  @IsEmail()
  email: string;

  @ApiHideProperty()
  origin: string;
}

@Injectable()
export class SendResetPasswordUseCase
  implements UseCase<SendResetPasswordUseCaseRequest, void>
{
  constructor(
    private readonly emailService: IEmailService,
    private readonly userRepository: UserRepository,
    private readonly jwt: JwtService,
  ) {}

  async execute(request: SendResetPasswordUseCaseRequest): Promise<void> {
    const user = await this.userRepository.getByEmail(request.email);

    if (!user) {
      return;
    }

    const token = await this.jwt.signAsync(
      { email: request.email, id: user.id },
      {
        expiresIn: Date.now() + 1000 * 120,
      },
    );

    const originSplit = request.origin.split('://');
    const scheme = originSplit[0];
    const host = originSplit[1];

    const url = `${scheme}://${host}/auth/reset-password?token=${token}`;
    const message = `Click <a href="${url}">here</a> to reset your password`;

    console.log(`Reset password link: ${url}`);

    const emailSend = await this.emailService.sendEmail(
      request.email,
      'Reset your password',
      message,
    );

    console.log(emailSend);
  }
}
