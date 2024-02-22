import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { otpService } from '../service/otp.service';
import { sendOtp } from '../dtos/sendotp.dto';
import { Response } from 'express';
import response from 'src/constants/response';
import errors from 'src/constants/errors';
import { ErrorsDto } from 'src/dtos/errors.dto';
import { verifyOtp } from '../dtos/verifyotp.dto';

@Controller('otp')
export class otpController {
  constructor(private otpService: otpService) {}
  @Post('send')
  @UsePipes(new ValidationPipe())
  async sendOtp(@Body() inputData: sendOtp, @Res() res: Response) {
    try {
      await this.otpService.send(inputData.mobileNumber);
      res.status(response.otpSent.statusCode).send(response.otpSent);
    } catch (err) {
      console.log(err);
      const error: ErrorsDto = err?.code ? err : errors.internalError;
      res.status(error.statusCode).send(error);
    }
  }

  @Post('fakeSend')
  @UsePipes(new ValidationPipe())
  async fakeSend(@Body() inputData: sendOtp, @Res() res: Response) {
    try {
      const otp = await this.otpService.fakeSend(inputData.mobileNumber);
      const result = { ...response.otpSent, otp };
      res.status(response.otpSent.statusCode).send(result);
    } catch (err) {
      console.log(err);
      const error: ErrorsDto = err?.code ? err : errors.internalError;
      res.status(error.statusCode).send(error);
    }
  }

  @Post('verify')
  @UsePipes(new ValidationPipe())
  async verifyOtp(@Body() inputData: verifyOtp, @Res() res: Response) {
    try {
      const token = await this.otpService.verify(
        inputData.mobileNumber,
        inputData.otp,
      );
      const result = { ...response.otpVerified, token };
      res.status(response.otpVerified.statusCode).send(result);
    } catch (err) {
      console.log(err);
      const error: ErrorsDto = err?.code ? err : errors.internalError;
      res.status(error.statusCode).send(error);
    }
  }
}
