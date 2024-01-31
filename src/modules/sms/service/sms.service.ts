import { Injectable } from '@nestjs/common';
import { RequestConfigDto } from '../dtos/request.dto';
import { sendSmsDto } from '../dtos/sendsms.dto';
import axios from 'axios';
import errors from 'src/constants/errors';

@Injectable()
export class SmsService {
  constructor(
    private from: string = process.env.SMS_NUMBER,
    private url: string = process.env.SMS_URL,
  ) {}
  async send(to: string, text: string) {
    const smsConfig: sendSmsDto = {
      from: this.from,
      to,
      text,
    };
    const config: RequestConfigDto = {
      method: 'post',
      url: this.url,
      data: JSON.stringify(smsConfig),
    };
    try {
      return await axios(config);
    } catch {
      throw errors.sendSmsError;
    }
  }
}
