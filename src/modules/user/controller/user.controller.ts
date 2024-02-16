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
import response from 'src/constants/response';
import errors from 'src/constants/errors';
import { Response } from 'express';

@Controller('user')
export class userController {
  constructor(private userService: userService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerInputs: registerDto, @Res() res: Response) {
    try {
      const existOrNot: boolean = await this.userService.existOrNot(
        registerInputs.nationalId,
      );
      if (existOrNot) {
        res.status(errors.duplicateUser.statusCode).send(errors.duplicateUser);
      }
      await this.userService.create(registerInputs);
      res.status(response.registered.statusCode).send(response.registered);
    } catch (err) {
      console.log(err);
      res.status(errors.registerError.statusCode).send(errors.registerError);
    }
  }
}
