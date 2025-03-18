import { Test, TestingModule } from '@nestjs/testing';
import { ResetPasswordUseCase } from './reset-password-use-case';

describe('ResetPasswordUseCase', () => {
  let service: ResetPasswordUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResetPasswordUseCase],
    }).compile();

    service = module.get<ResetPasswordUseCase>(ResetPasswordUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
