import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class BcryptService {
  private saltRounds = 10;

  async hash(password: string): Promise<string> {
    return hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
