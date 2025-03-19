import { Role } from '@prisma/client';

export class UserCredentialsDto {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export class ResetUserCredentialsDto {
  id: string;
  password: string;
}
