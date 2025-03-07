import { CreateUserDto } from '../entities/user/dto/create-user.dto';
import { UserCredentialsDto } from '../entities/user/dto/user-credentials.dto';
import { UserDto } from '../entities/user/dto/user.dto';
import { User } from '../entities/user/user';

export abstract class UserRepository {
  abstract create(user: CreateUserDto): Promise<string>;
  abstract findById(id: string): Promise<UserDto | null>;
  abstract findAll(): Promise<UserDto[]>;
  abstract save(user: User): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract getByEmail(email: string): Promise<UserDto | null>;
  abstract getCredentials(email: string): Promise<UserCredentialsDto | null>;
}
