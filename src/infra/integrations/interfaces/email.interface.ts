export abstract class IEmailService {
  abstract sendEmail(
    email: string,
    subject: string,
    message: string,
  ): Promise<SendMailResponse>;
}

export interface SendMailResponse {
  success: boolean;
  message?: string;
  error?: {
    code: string;
    message: string;
  };
  id?: string;
}
