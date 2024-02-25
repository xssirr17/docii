import { Module } from '@nestjs/common';
import { FileController } from './controller/files.controller';
import { FileService } from './service/files.service';

@Module({
  controllers: [FileController],
  providers: [FileService],
})
export class FilesModule {}
