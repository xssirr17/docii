import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DoctorController } from './controller/doctor.controller';
import { DoctorService } from './service/doctor.service';
import { CheckTempTokenMiddleware } from '../user/middlewares/check-temp-token/check-temp-token.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from './schema/doctor.schema';
import { Presents, PresentsSchema } from './schema/present.schema';
import { Category, CategorySchema } from '../category/schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Doctor.name, schema: DoctorSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Presents.name, schema: PresentsSchema },
    ]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTempTokenMiddleware).forRoutes('/doctor/register');
  }
}
