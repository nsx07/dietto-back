import { Injectable } from '@nestjs/common';
import { UseCase } from '../../use-case';
import { CreateUserDto } from '@/application/entities/user/dto/create-user.dto';
import { IUserService } from '@/application/services/contract/iuser.service';
import { ResponseDto } from '@/shared/utils/response-dto';
import { UserException } from '@/application/exceptions/user.exception';

export type SignUpUseCaseRequest = CreateUserDto;

@Injectable()
export class SignUpUseCase
  implements UseCase<SignUpUseCaseRequest, ResponseDto<string>>
{
  constructor(private readonly userService: IUserService) {}

  async execute(request: SignUpUseCaseRequest): Promise<ResponseDto<string>> {
    const emailUsed = await this.userService.getByEmail(request.email);

    if (emailUsed) {
      throw UserException.emailAlreadyInUse();
    }

    const response = await this.userService.create(request);
    return ResponseDto.success(response, 'Usuário criado com sucesso!');
  }
}
