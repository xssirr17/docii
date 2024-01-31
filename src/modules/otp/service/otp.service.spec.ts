import { Test, TestingModule } from '@nestjs/testing';
import { otpService } from './otp.service';

describe('otpService', () => {
  let service: otpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [otpService],
    }).compile();

    service = module.get<otpService>(otpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
