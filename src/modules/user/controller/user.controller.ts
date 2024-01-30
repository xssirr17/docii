import {
  Body,
  Controller,
  Post,
  UsePipes,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { userService } from '../service/user.service';
import { registerDto } from '../dtos/register.dto';
import errors from '../../../constants/errors';
import { Response } from 'express';

@Controller('user')
export class userController {
  constructor(private userService: userService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(
    @Body() registerInputs: registerDto,
    @Res() response: Response,
  ) {
    try {
      const existOrNot: boolean = await this.userService.existOrNot(
        registerInputs.mobileNumber,
      );
      if (existOrNot) {
        response
          .status(errors.duplicateUser.statusCode)
          .send(errors.duplicateUser);
      }
      return await this.userService.create(registerInputs);
    } catch (err) {
      console.log(err);
      response
        .status(errors.registerError.statusCode)
        .send(errors.registerError);
    }
  }
}
