import { Injectable } from '@nestjs/common';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

@Injectable()
export class RegisterDoctorDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  mobileNumber: string;

  @IsNotEmpty()
  nationalId: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @IsNotEmpty()
  categories: Array<string>;

  link: string;

  @IsNotEmpty()
  history: number;

  @IsNotEmpty()
  biographi: string;
}
