import { Injectable, Param } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

@Injectable()
export class UpdateCategoryDto {
  @IsNotEmpty()
  name: string;

  description: string;

  link: string;
}
