import { Injectable } from '@nestjs/common';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

@Injectable()
export class RegisterDoctor {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @IsNotEmpty()
  categories: Array<string>;

  biographi: string;

  link: string;
  
  history: number;
}
