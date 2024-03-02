import { Length, MinLength, Matches, IsNotEmpty } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  @Length(11)
  mobileNumber: string;

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
