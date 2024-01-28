import { Module } from '@nestjs/common';
import { ControllerController } from './user/controller/controller.controller';
import { ServiceService } from './user/service/service.service';

@Module({
  imports: [],
  controllers: [ControllerController],
  providers: [ServiceService],
})
export class AppModule {}
