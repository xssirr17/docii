import { IsNotEmpty } from 'class-validator';

export class RequestConfigDto {
  @IsNotEmpty()
  method: string;
  @IsNotEmpty()
  url: string;
  data: string;
}
