import { Injectable, Param } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

@Injectable()
export class DeleteCategoryDto {
  @IsNotEmpty()
  name: string;
}
