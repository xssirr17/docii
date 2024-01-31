import { Test, TestingModule } from '@nestjs/testing';
import { otpController } from './otp.controller';

describe('otpController', () => {
  let controller: otpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [otpController],
    }).compile();

    controller = module.get<otpController>(otpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
