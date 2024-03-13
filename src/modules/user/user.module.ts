import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { userService } from './service/user.service';
import { userController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { CheckTempTokenMiddleware } from './middlewares/check-temp-token/check-temp-token.middleware';
import { Presents, PresentsSchema } from '../doctor/schema/present.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Presents.name, schema: PresentsSchema },
    ]),
  ],
  providers: [userService],
  controllers: [userController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTempTokenMiddleware).forRoutes('/user/register');
  }
}
