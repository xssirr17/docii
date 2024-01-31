import { IsNotEmpty, Length } from 'class-validator';

export class sendOtp {
  @IsNotEmpty()
  @Length(11)
  mobileNumber: string;
}
