import { Injectable } from '@nestjs/common';
import {
  IsDate,
  IsNotEmpty,
  Length,
  MinLength,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

@Injectable()
export class RegisterDoctorDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @Length(11)
  mobileNumber: string;

  @IsNotEmpty()
  @Length(10)
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

  @MinLength(8)
  @Matches(/\d/, { message: 'Password must contain at least one digit' })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[@$!%*#?&()+\-/;,.:'=_<>|~^`{}[\]\\]/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}
