import { IsNotEmpty, Length } from 'class-validator';

export class verifyOtp {
  @IsNotEmpty()
  @Length(6)
  otp: number;

  @IsNotEmpty()
  @Length(11)
  mobileNumber: string;
}
