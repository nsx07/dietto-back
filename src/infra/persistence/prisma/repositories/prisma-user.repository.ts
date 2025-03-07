import { Injectable } from '@nestjs/common';
import { User } from '@/application/entities/user/user';
import { UserRepository } from '@/application/repositories/user.repository';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from '@/application/entities/user/dto/create-user.dto';
import { UserDto } from '@/application/entities/user/dto/user.dto';
import { UserCredentialsDtoQuery, UserDtoQuery } from '../queries/user.query';
import { UserCredentialsDto } from '@/application/entities/user/dto/user-credentials.dto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<UserDto | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
      ...UserDtoQuery,
    });
  }

  async findAll(): Promise<UserDto[]> {
    return this.prismaService.user.findMany({
      ...UserDtoQuery,
    });
  }

  async getByEmail(email: string): Promise<UserDto | null> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
      ...UserDtoQuery,
    });
  }

  async getCredentials(email: string): Promise<UserCredentialsDto | null> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
      ...UserCredentialsDtoQuery,
    });
  }

  async create(user: CreateUserDto): Promise<string> {
    return this.prismaService.user
      .create({
        data: {
          name: user.name,
          email: user.email,
          passwordHash: user.password,
          isActive: true,
        },
        select: {
          id: true,
        },
      })
      .then((user) => user.id);
  }

  async save(user: User): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
        isActive: user.isActive,
      },
    });
  }

  async delete(id: string): Promise<void> {
    this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
