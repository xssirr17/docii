import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongoModule } from './databases/mongo/mongo.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SmsModule } from './modules/sms/sms.module';
import { OtpModule } from './modules/otp/otp.module';
import { RedisModule } from './databases/redis/redis.module';
import { AccessControlMiddleware } from './middlewares/access-control/access-control.middleware';
import { RatelimitMiddleware } from './middlewares/ratelimit/ratelimit.middleware';
import { CategoryModule } from './modules/category/category.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    MongoModule,
    UserModule,
    ConfigModule.forRoot(),
    SmsModule,
    OtpModule,
    RedisModule,
    CategoryModule,
    DoctorModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessControlMiddleware, RatelimitMiddleware).forRoutes('/');
  }
}
  