import { IsNotEmpty, Length } from 'class-validator';

export class sendSmsDto {
  @IsNotEmpty()
  from: string;
  @IsNotEmpty()
  @Length(11)
  to: string;
  text: string;
}
