import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { registerDto } from '../../user/dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

}
