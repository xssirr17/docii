import { Injectable } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

@Injectable()
export class DeleteDoctorDto {
  @IsNotEmpty()
  id: string;
}
