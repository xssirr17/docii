import { Module } from '@nestjs/common';
import { userService } from './service/user.service';
import { userController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [userService],
  controllers: [userController],
})
export class UserModule {}
