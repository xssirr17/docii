import { IsNotEmpty, Length, MinLength, Matches } from 'class-validator';

export class registerDto {
  @IsNotEmpty()
  @Length(11)
  mobileNumber: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @MinLength(8)
  @Matches(/\d/, { message: 'Password must contain at least one digit' })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[@$!%*#?&()+\-/;,.:'=_<>|~^`{}[\]\\]/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}
