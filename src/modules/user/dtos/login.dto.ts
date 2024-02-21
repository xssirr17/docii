import {
  IsOptional,
  Length,
  MinLength,
  Matches,
  ValidateIf,
  IsDefined,
} from 'class-validator';

export class loginDto {
  @Length(11)
  @IsOptional()
  mobileNumber?: string;

  @IsOptional()
  @Length(10)
  nationalId?: string;

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

  @ValidateIf(
    (o) =>
      (!o.mobileNumber && !o.nationalId) || (o.mobileNumber && o.nationalId),
  )
  @IsDefined({
    message: 'Provide either mobileNumber or nationalId, and only one of them',
  })
  protected readonly combinedCheck: undefined;
}
