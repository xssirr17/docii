import { IsNotEmpty } from 'class-validator';

export class ReserveDto {
  @IsNotEmpty()
  id: string;
}
