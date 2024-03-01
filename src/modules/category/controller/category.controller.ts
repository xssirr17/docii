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
import { CategoryService } from '../service/category.service';
import { AddCategoryDto } from '../dtos/add.dto';
import { Response } from 'express';
import { DeleteCategoryDto } from '../dtos/delete.dto';
import { UpdateCategoryDto } from '../dtos/update.dto';
import errors from 'src/constants/errors';
import responses from 'src/constants/response';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async addCategory(@Body() input: AddCategoryDto, @Res() response: Response) {
    try {
      let result: object = await this.categoryService.add(input);
      result = { ...responses.success, result };
      response.status(responses.success.statusCode).send(result);
    } catch (err) {
      console.log(err);
      err = err?.code ? err : errors.internalError;
      response.status(err.statusCode).send(err);
    }
  }

  @Delete()
  @UsePipes(new ValidationPipe())
  async deleteCategory(
    @Body() input: DeleteCategoryDto,
    @Res() response: Response,
  ) {
    try {
      await this.categoryService.delete(input);
      response.status(responses.success.statusCode).send(responses.success);
    } catch (err) {
      console.log(err);
      err = err?.code ? err : errors.internalError;
      response.status(err.statusCode).send(err);
    }
  }

  @Put()
  @UsePipes(new ValidationPipe())
  async updateCategory(
    @Body() input: UpdateCategoryDto,
    @Res() response: Response,
  ) {
    try {
      await this.categoryService.update(input);
      response.status(responses.success.statusCode).send(responses.success);
    } catch (err) {
      console.log(err);
      err = err?.code ? err : errors.internalError;
      response.status(err.statusCode).send(err);
    }
  }

  @Get(':name?')
  async getCategory(@Param('name') id, @Res() response: Response) {
    try {
      let result: object = await this.categoryService.get(id);
      result = { ...responses.success, result };
      response.status(responses.success.statusCode).send(result);
    } catch (err) {
      console.log(err);
      err = err?.code ? err : errors.internalError;
      response.status(err.statusCode).send(err);
    }
  }
}
