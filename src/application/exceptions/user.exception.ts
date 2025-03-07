import { HttpException, HttpStatus } from '@nestjs/common';

export class UserException extends HttpException {
  details?: Record<string, any>;

  private constructor(
    message: string,
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    details?: Record<string, unknown>,
  ) {
    super(message, status);
    this.details = details;

    HttpException.captureStackTrace(this, UserException);
  }

  public static notFound(details?: Record<string, unknown>): UserException {
    return new UserException('User not found', HttpStatus.NOT_FOUND, details);
  }

  public static invalidPassword(
    details?: Record<string, unknown>,
  ): UserException {
    return new UserException(
      'Invalid password',
      HttpStatus.UNAUTHORIZED,
      details,
    );
  }
}
