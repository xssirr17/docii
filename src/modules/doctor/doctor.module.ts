import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DoctorController } from './controller/doctor.controller';
import { DoctorService } from './service/doctor.service';
import { CheckTempTokenMiddleware } from '../user/middlewares/check-temp-token/check-temp-token.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from './schema/doctor.schema';
import { Category, CategorySchema } from '../category/schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckTempTokenMiddleware)
      .forRoutes({ path: '/doctor', method: RequestMethod.POST });
  }
}
