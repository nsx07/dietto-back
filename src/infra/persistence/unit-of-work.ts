import { Prisma, PrismaClient } from '@prisma/client';

export abstract class UnitOfWork {
  abstract transaction<T>(
    fn: (context: PrismaClient | Prisma.TransactionClient) => Promise<T>,
  ): Promise<T>;
}
