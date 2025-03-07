import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from './infra/persistence/persistence.module';
import { HttpModule } from './infra/http/http.module';
import { SecurityModule } from './infra/security/security.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    PersistenceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
