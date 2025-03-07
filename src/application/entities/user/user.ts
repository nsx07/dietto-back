import { type User as IUser } from '@prisma/client';

export class User implements IUser {
  name: string;
  id: string;
  email: string;
  passwordHash: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
