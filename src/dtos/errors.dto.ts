import { IsNotEmpty, Length } from 'class-validator';

export class ErrorsDto {
  @IsNotEmpty()
  code: string;
  @IsNotEmpty()
  message: string;
  @IsNotEmpty()
  @Length(3)
  statusCode: number;
}
