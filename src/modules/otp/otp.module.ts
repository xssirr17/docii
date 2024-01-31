import { Module } from '@nestjs/common';
import { otpService } from './service/otp.service';
import { otpController } from './controller/otp.controller';

@Module({
  providers: [otpService],
  controllers: [otpController],
})
export class OtpModule {}
