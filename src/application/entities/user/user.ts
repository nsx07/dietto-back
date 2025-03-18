import { $Enums, Role, type User as IUser } from '@prisma/client';

export class User implements IUser {
  name: string;
  id: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  roles: $Enums.Role;
}
