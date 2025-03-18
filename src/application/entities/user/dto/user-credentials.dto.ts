export class UserCredentialsDto {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class ResetUserCredentialsDto {
  id: string;
  password: string;
}
