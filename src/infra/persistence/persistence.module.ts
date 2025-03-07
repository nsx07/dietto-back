import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '@/application/repositories/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';
import { UnitOfWork } from './unit-of-work';
import { PrismaProvider } from './prisma/prisma-uof';

@Module({
  providers: [
    PrismaService,
    {
      provide: UnitOfWork,
      useValue: PrismaProvider,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UnitOfWork, UserRepository],
})
export class PersistenceModule {}
