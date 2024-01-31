import { Controller, Get, Post } from '@nestjs/common';
import { otpService } from '../service/otp.service';

@Controller('otp')
export class otpController {
  constructor(private otpService: otpService) {}
  @Get('send')
  async sendOtp() {}

  @Post('verify')
  async verifyOtp() {}
}
