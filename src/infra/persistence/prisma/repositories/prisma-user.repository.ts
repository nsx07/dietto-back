import { Injectable } from '@nestjs/common';
import { User } from '@/application/entities/user/user';
import { UserRepository } from '@/application/repositories/user.repository';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from '@/application/entities/user/dto/create-user.dto';
import { UserDto } from '@/application/entities/user/dto/user.dto';
import { UserCredentialsDtoQuery, UserDtoQuery } from '../queries/user.query';
import { UserCredentialsDto } from '@/application/entities/user/dto/user-credentials.dto';
import { Role } from '@prisma/client';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<UserDto | null> {
    return this.prismaService.contact
      .findUnique({
        where: {
          userId: id,
        },
        ...UserDtoQuery,
      })
      .then((ctt) => (ctt ? { ...ctt.user, email: ctt.email } : null));
  }

  async findAll(): Promise<UserDto[]> {
    return [];
  }

  async getByEmail(email: string): Promise<UserDto | null> {
    return this.prismaService.contact
      .findUnique({
        where: {
          email,
        },
        ...UserDtoQuery,
      })
      .then((ctt) => (ctt ? { ...ctt.user, email: ctt.email } : null));
  }

  async getCredentials(email: string): Promise<UserCredentialsDto | null> {
    return this.prismaService.contact
      .findUnique({
        where: {
          email,
        },
        ...UserCredentialsDtoQuery,
      })
      .then((ctt) =>
        ctt
          ? {
              id: ctt.userId,
              email: ctt.email,
              name: ctt.user.name,
              password: ctt.user.password,
            }
          : null,
      );
  }

  async create(user: CreateUserDto): Promise<string> {
    return this.prismaService.user
      .create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          isActive: true,
          roles: Role.NUTRITIONIST,
          contact: {
            create: {
              email: user.email,
            },
          },
        },
        select: {
          id: true,
        },
      })
      .then((user) => user.id);
  }

  async save(user: User): Promise<void> {
    return;
  }

  async delete(id: string): Promise<void> {
    this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
