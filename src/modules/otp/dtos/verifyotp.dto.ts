import { IsNotEmpty, Length } from 'class-validator';

export class verifyOtp {
  @IsNotEmpty()
  @Length(5)
  otp: string;

  @IsNotEmpty()
  @Length(11)
  mobileNumber: string;
}
