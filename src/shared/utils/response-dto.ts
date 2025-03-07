export class ResponseDto<T> {
  constructor(
    public data: T,
    public message: string,
    public success: boolean,
  ) {}

  static success<T>(data: T, message = 'Success'): ResponseDto<T> {
    return new ResponseDto(data, message, true);
  }

  static error<T>(message = 'Error'): ResponseDto<T> {
    return new ResponseDto<T>(null as T, message, false);
  }
}
