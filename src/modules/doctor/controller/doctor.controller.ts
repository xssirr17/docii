import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DoctorService } from '../service/doctor.service';
import { RegisterDoctorDto } from '../dtos/registerDoctor.dto';
import response from 'src/constants/response';
import { Response } from 'express';
import errors from 'src/constants/errors';
import { UpdateDoctorDto } from '../dtos/updateDoctor.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuards } from 'src/guards/auth.guard';
import { RolesGuards } from 'src/guards/roles.guards';
import { loginDto } from '../dtos/loginDoctor.dto';
import { RegisterPresentDto } from '../dtos/registerPresent.dto';
import { PresentsDto } from '../dtos/presents.dt';

@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async addDoctor(@Body() input: RegisterDoctorDto, @Res() res: Response) {
    try {
      let token: string = await this.doctorService.create(input);
      const result = { ...response.success, token };
      res.status(response.success.statusCode).send(result);
    } catch (err) {
      console.log(err);
      err = err?.code ? err : errors.internalError;
      res.status(err.statusCode).send(err);
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginInput: loginDto, @Res() res: Response) {
    try {
      const token = await this.doctorService.login(loginInput);
      const result = { ...response.loggedIn, token };
      res.status(response.loggedIn.statusCode).send(result);
    } catch (err) {
      console.log(err);
      err = err?.code ? err : errors.internalError;
      res.status(err.statusCode).send(err);
    }
  }

  @Post('present/setting')
  @Roles(['doctor'])
  @UseGuards(AuthGuards, RolesGuards)
  @UsePipes(new ValidationPipe())
  async registerPresent(
    @Body() input: RegisterPresentDto,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const mobileNumber = req.mobileNumber;
      await this.doctorService.registerPresent(input, mobileNumber);
      res.status(response.success.statusCode).send(response.success);
    } catch (err) {
      console.log(err);
      err = err?.code ? err : errors.internalError;
      res.status(err.statusCode).send(err);
    }
  }

  @Delete()
  @UsePipes(new ValidationPipe())
  @Roles(['doctor'])
  @UseGuards(AuthGuards, RolesGuards)
  async deleteDoctor(@Req() req, @Res() res: Response) {
    try {
      const mobileNumber = req.mobileNumber;
      await this.doctorService.delete(mobileNumber);
      res.status(response.success.statusCode).send(response.success);
    } catch (err) {
      console.log(err);
      err = err?.code ? err : errors.internalError;
      res.status(err.statusCode).send(err);
    }
  }

  @Put()
  @Roles(['doctor'])
  @UseGuards(AuthGuards, RolesGuards)
  @UsePipes(new ValidationPipe())
  async updateDoctor(
    @Body() input: UpdateDoctorDto,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const mobileNumber = req.mobileNumber;
      await this.doctorService.update(input, mobileNumber);
      res.status(response.success.statusCode).send(response.success);
    } catch (err) {
      console.log(err);
      err = err?.code ? err : errors.internalError;
      res.status(err.statusCode).send(err);
    }
  }

  @Get()
  async getDoctor(
    @Query('id') id: string,
    @Query('page') page: string,
    @Query('sortBy') sortBy: string,
    @Query('sortType') sortType,
    @Res() res: Response,
  ) {
    try {
      let result: object = await this.doctorService.get({
        id,
        page,
        sortBy,
        sortType,
      });
      result = { ...response.success, result };
      res.status(response.success.statusCode).send(result);
    } catch (err) {
      console.log(err);
      err = err?.code ? err : errors.internalError;
      res.status(err.statusCode).send(err);
    }
  }

  @Post('present/time')
  @Roles(['doctor'])
  @UseGuards(AuthGuards, RolesGuards)
  @UsePipes(new ValidationPipe())
  async setPresentsTime(@Body() input: PresentsDto, @Res() res: Response) {
    try {
      await this.doctorService.setpresents(input);
      res.status(response.success.statusCode).send(response.success);
    } catch (err) {
      console.log(err);
      err = err?.code ? err : errors.internalError;
      res.status(err.statusCode).send(err);
    }
  }

  @Get('present/time')
  async getPresentTimes(
    @Query('id') id: string,
    @Query('date') date: string,
    @Res() res: Response,
  ) {
    try {
      let result = await this.doctorService.getPresentTimes({ id, date });
      result = { ...response.success, result };
      res.status(response.success.statusCode).send(result);
    } catch (err) {
      console.log(err);
      err = err?.code ? err : errors.internalError;
      res.status(err.statusCode).send(err);
    }
  }
}
