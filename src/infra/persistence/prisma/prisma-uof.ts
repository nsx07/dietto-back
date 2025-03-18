import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { AsyncLocalStorage } from 'async_hooks';
import { UnitOfWork } from '../unit-of-work';

type PrismaTransaction<T> = (
  context: PrismaClient | Prisma.TransactionClient,
) => Promise<T>;

@Injectable()
export class PrismaProvider extends PrismaClient implements UnitOfWork {
  private asyncLocalStorage = new AsyncLocalStorage<
    Prisma.TransactionClient | PrismaProvider
  >();

  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }

  async transaction<T>(fn: PrismaTransaction<T>) {
    console.log('Transaction started', fn, 1);

    return this.$transaction(async (transactionClient) => {
      return this.asyncLocalStorage.run(transactionClient, async () => {
        try {
          const result = await fn(this.client);
          return result;
        } catch (error) {
          console.error('Transaction error:', error);
          throw error;
        }
      });
    });
  }

  get client(): PrismaClient | Prisma.TransactionClient {
    const transactionClient = this.asyncLocalStorage.getStore();

    return transactionClient ?? this;
  }
}
