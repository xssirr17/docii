import { Injectable } from '@nestjs/common';
import { IsDate, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

@Injectable()
export class RegisterPresentDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  presentUntil: Date;

  @IsNotEmpty()
  @Min(30)
  rangeOfBetweenPresent: number;
}
