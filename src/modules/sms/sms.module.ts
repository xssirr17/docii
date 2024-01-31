import { Module } from '@nestjs/common';
import { SmsService } from './service/sms.service';

@Module({
  providers: [SmsService],
})
export class SmsModule {}
