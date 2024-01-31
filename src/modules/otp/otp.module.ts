import { Module } from '@nestjs/common';
import { otpService } from './service/otp.service';
import { otpController } from './controller/otp.controller';
import { SmsService } from '../sms/service/sms.service';

@Module({
  providers: [otpService, SmsService],
  controllers: [otpController],
})
export class OtpModule {}
