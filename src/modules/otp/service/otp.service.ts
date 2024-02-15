import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import errors from 'src/constants/errors';
import * as speakeasy from 'speakeasy';
import { SmsService } from '../../sms/service/sms.service';

@Injectable()
export class otpService {
  private expireTime: number;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private smsService: SmsService,
  ) {
    this.expireTime = 2 * 60 * 1000;
  }

  async send(mobileNumber: string) {
    try {
      const cacheOtpKey: string = `otp_${mobileNumber}`;
      const activeOtp: string = await this.cacheManager.get(cacheOtpKey);
      if (activeOtp) {
        throw errors.otpAlredySent;
      }
      const secret = speakeasy.generateSecret({ length: 20 });
      let code = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32',
      });
      code /= 10;
      code = code.toString();
      
      await Promise.all([
        this.smsService.send(mobileNumber, code),
        this.cacheManager.set(cacheOtpKey, code, this.expireTime),
      ]);
    } catch (err) {
      throw err;
    }
  }
  async verify(mobileNumber: string, otp: string) {
    const cacheOtpKey: string = `otp_${mobileNumber}`;
    const activeOtp: string = await this.cacheManager.get(cacheOtpKey);
    if (activeOtp) {
      if (activeOtp === otp) {
        return;
      } else {
        throw errors.wrongOtp;
      }
    } else {
      throw errors.otpExpired;
    }
  }
}
