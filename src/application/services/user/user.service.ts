import { Injectable } from '@nestjs/common';
import { IUserService } from '../contract/iuser.service';
import { CreateUserDto } from '@/application/entities/user/dto/create-user.dto';
import { User } from '@/application/entities/user/user';
import { UserRepository } from '@/application/repositories/user.repository';
import { UnitOfWork } from '@/infra/persistence/unit-of-work';
import { BcryptService } from '@/infra/security/bcrypt/bcrypt.service';
import { UserDto } from '@/application/entities/user/dto/user.dto';
import { UserCredentialsDto } from '@/application/entities/user/dto/user-credentials.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcrypt: BcryptService,
  ) {}

  findById(id: string): Promise<UserDto | null> {
    return this.userRepository.findById(id);
  }

  findAll(): Promise<UserDto[]> {
    return this.userRepository.findAll();
  }

  getByEmail(email: string): Promise<UserDto | null> {
    return this.userRepository.getByEmail(email);
  }

  getCredentials(email: string): Promise<UserCredentialsDto | null> {
    return this.userRepository.getCredentials(email);
  }

  async create(user: CreateUserDto): Promise<string> {
    user.password = await this.bcrypt.hash(user.password);
    return this.userRepository.create(user);
  }

  save(user: User): Promise<void> {
    return this.userRepository.save(user);
  }

  delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}
