import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
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

@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async addDoctor(@Body() input: RegisterDoctorDto, @Res() res: Response) {
    try {
      let result: object = await this.doctorService.create(input);
      result = { ...response.success, result };
      res.status(response.success.statusCode).send(result);
    } catch (err) {
      console.log(err);
      err = err?.code ? err : errors.internalError;
      res.status(err.statusCode).send(err);
    }
  }
  @Delete()
  @UsePipes(new ValidationPipe())
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
  @Get(':id?/:page?/:sortBy?/:sortType?')
  async getDoctor(
    @Param('id') id: string,
    @Param('page') page: string,
    @Param('sortBy') sortBy: ['score', 'history', 'followers'],
    @Param('sortType') sortType: boolean,
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
