import { Injectable } from '@nestjs/common';
import { UseCase } from '../../use-case';
import { CreateUserDto } from '@/application/entities/user/dto/create-user.dto';
import { IUserService } from '@/application/services/contract/iuser.service';

export type SignUpUseCaseRequest = CreateUserDto;

@Injectable()
export class SignUpUseCase implements UseCase<SignUpUseCaseRequest, string> {
  constructor(private readonly userService: IUserService) {}

  async execute(request: SignUpUseCaseRequest): Promise<string> {
    const response = await this.userService.create(request);
    return response;
  }
}
