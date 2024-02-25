import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileService } from '../service/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import errors from 'src/constants/errors';
import { Response } from 'express';
import response from 'src/constants/response';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads/',
    }),
  )
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5000000 })],
      }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const result = { ...response.success, result: file };
      res.status(response.success.statusCode).send(result);
    } catch (err) {
      res.status(errors.internalError.statusCode).send(errors.internalError);
    }
  }

  @Get(':path')
  async getFile(@Param('path') path: string, @Res() res: Response) {
    try {
      path = join(process.cwd(), `/uploads/${path}`);
      if (!existsSync(path)) {
        throw errors.notFound;
      }
      const file = createReadStream(path);
      const base64 = await this.fileService.convertToBase64(file);
      const result = { ...response.success, result: base64 };
      res.status(response.success.statusCode).send(result);
    } catch (err) {
      res.status(errors.internalError.statusCode).send(errors.internalError);
    }
  }
}
