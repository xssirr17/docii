import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import errors from 'src/constants/errors';
import * as speakeasy from 'speakeasy';
import { SmsService } from '../../sms/service/sms.service';
import { generateToken } from 'src/helpers/generateToken';

@Injectable()
export class otpService {
  private otpExpireTime: number;
  private tempTokenExpireTime: number;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private smsService: SmsService,
  ) {
    this.otpExpireTime = 2 * 60 * 1000;
    this.tempTokenExpireTime = 60 * 60;
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
      code = code.toString();
      code = code.substring(0, 5);

      await Promise.all([
        this.smsService.send(mobileNumber, code),
        this.cacheManager.set(cacheOtpKey, code, this.otpExpireTime),
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
        const payload: object = {
          mobileNumber,
        };
        const token = generateToken(payload, this.tempTokenExpireTime);
        await this.#storeTempToken(token, mobileNumber);
        return token;
      } else {
        throw errors.wrongOtp;
      }
    } else {
      throw errors.otpExpired;
    }
  }

  async #storeTempToken(token: string, mobileNumber: string) {
    const tokenkey = `tempToken_${mobileNumber}`;
    await this.cacheManager.set(
      tokenkey,
      token,
      this.tempTokenExpireTime * 1000,
    );
  }

  async fakeSend(mobileNumber: string) {
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
      code = code.toString(); 
      code = code.substring(0, 5);
      
      await Promise.all([
        this.cacheManager.set(cacheOtpKey, code, this.otpExpireTime),
      ]);
      return code;
    } catch (err) {
      throw err;
    }
  }
}
