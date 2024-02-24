import { Module } from '@nestjs/common';
import { DoctorController } from './controller/doctor.controller';
import { DoctorService } from './service/doctor.service';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
