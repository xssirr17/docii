import { Injectable } from '@nestjs/common';
import { RequestConfigDto } from '../dtos/request.dto';
import { sendSmsDto } from '../dtos/sendsms.dto';
import axios from 'axios';
import errors from 'src/constants/errors';

@Injectable()
export class SmsService {
  private from: string;
  private url: string;
  constructor() {
    this.from = process.env.SMS_NUMBER;
    this.url = process.env.SMS_URL;
  }
  async send(to: string, text: string) {
    const smsConfig: sendSmsDto = {
      from: this.from,
      to,
      text,
    };
    const config: RequestConfigDto = {
      method: 'post',
      url: this.url,
      data: smsConfig,
    };
    try {
      return await axios(config);
    } catch (err) {
      throw errors.sendSmsError;
    }
  }
}
