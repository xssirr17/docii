import { Injectable } from '@nestjs/common';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

@Injectable()
export class UpdateDoctorDto {
  firstName: string;

  lastName: string;

  nationalId: string;

  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  categories: Array<string>;

  biographi: string;

  link: string;

  history: number;

  @IsNotEmpty()
  id: string;
}
