import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '@/application/repositories/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';
import { UnitOfWork } from './unit-of-work';
import { PrismaProvider } from './prisma/prisma-uof';

@Module({
  providers: [
    PrismaService,
    PrismaProvider,
    // {
    //   provide: UnitOfWork,
    //   useValue: PrismaProvider,
    // }, nestjs cannot find the provider declarating this way. TODO: investigate why
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PrismaProvider, UserRepository],
})
export class PersistenceModule {}
