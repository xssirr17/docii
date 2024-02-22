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
import { loginDto } from '../dtos/login.dto';

@Controller('user')
export class userController {
  constructor(private userService: userService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(
    @Body() registerInputs: registerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const existOrNot: boolean = await this.userService.existOrNot(
        registerInputs.nationalId,
      );
      if (existOrNot) {
        res.status(errors.duplicateUser.statusCode).send(errors.duplicateUser);
      }
      await this.userService.create(registerInputs);
      const token = this.userService.generateToken({
        mobileNumber: registerInputs.mobileNumber,
      });
      await this.userService.prepareRegisterTokens(
        token,
        registerInputs.mobileNumber,
      );
      const result = { ...response.registered, token };
      res.cookie('token', token);
      res.status(response.registered.statusCode).send(result);
    } catch (err) {
      console.log(err);
      res.status(errors.registerError.statusCode).send(errors.registerError);
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() loginInput: loginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const alreadyLoggedInOrNot =
        await this.userService.alreadyLoggedInOrNot(loginInput);
      if (alreadyLoggedInOrNot) {
        res
          .status(errors.alreadyLoggedIn.statusCode)
          .send(errors.alreadyLoggedIn);
      } else {
        const token = await this.userService.login(loginInput);
        const result = { ...response.loggedIn, token };
        res.cookie('token', token);
        res.status(response.loggedIn.statusCode).send(result);
      }
    } catch (err) {
      console.log(err);
      res.status(errors.unauthorized.statusCode).send(errors.unauthorized);
    }
  }
}
