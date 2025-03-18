import { Test, TestingModule } from '@nestjs/testing';
import { ResetPasswordUseCaseRequest } from './reset-password-use-case';

describe('ResetPasswordUseCaseService', () => {
  let service: ResetPasswordUseCaseRequest;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResetPasswordUseCaseRequest],
    }).compile();

    service = module.get<ResetPasswordUseCaseRequest>(
      ResetPasswordUseCaseRequest,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
