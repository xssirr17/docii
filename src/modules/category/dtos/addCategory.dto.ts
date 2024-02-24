import { Injectable, Param } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

@Injectable()
export class DeleteCategory {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  link: string;
}
