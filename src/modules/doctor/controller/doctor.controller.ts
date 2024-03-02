import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
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
import { DeleteDoctorDto } from '../dtos/deleteDoctor.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuards } from 'src/guards/auth.guard';
import { RolesGuards } from 'src/guards/roles.guards';

@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Post()
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
  @Delete()
  @UsePipes(new ValidationPipe())
  @Roles(['doctor'])
  @UseGuards(AuthGuards, RolesGuards)
  async deleteDoctor(@Body() input: DeleteDoctorDto, @Res() res: Response) {
    try {
      await this.doctorService.delete(input);
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
  async updateDoctor(@Body() input: UpdateDoctorDto, @Res() res: Response) {
    try {
      await this.doctorService.update(input);
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
}
