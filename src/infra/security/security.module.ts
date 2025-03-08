import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptService } from './bcrypt/bcrypt.service';
import { APP_GUARD } from '@nestjs/core';
import { KeeperGuard } from './keeper/keeper.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: new Date().getTime() + 1000 * 60 * 60 * 3 },
    }),
  ],
  providers: [
    BcryptService,
    {
      provide: APP_GUARD,
      useClass: KeeperGuard,
    },
  ],
  exports: [JwtModule, BcryptService],
})
export class SecurityModule {}
