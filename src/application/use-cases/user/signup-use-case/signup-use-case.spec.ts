import { Test, TestingModule } from '@nestjs/testing';
import { SignUpUseCase } from './signup-use-case';

describe('SignUpUseCase', () => {
  let service: SignUpUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignUpUseCase],
    }).compile();

    service = module.get<SignUpUseCase>(SignUpUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
