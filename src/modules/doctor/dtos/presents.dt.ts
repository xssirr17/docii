import { IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class PresentsDto {
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNotEmpty()
  times: string[];

  @IsNotEmpty()
  doctorId: string;
}
