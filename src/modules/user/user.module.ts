import { Module } from '@nestjs/common';
import { userService } from './service/user.service';
import { userController } from './controller/user.controller';

@Module({
  providers: [userService],
  controllers: [userController],
})
export class UserModule {}
