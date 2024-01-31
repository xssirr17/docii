import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MongoModule } from './databases/mongo/mongo.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SmsModule } from './modules/sms/sms.module';
import { OtpModule } from './modules/otp/otp.module';
import { RedisModule } from './databases/redis/redis.module';

@Module({
  imports: [AuthModule, MongoModule, UserModule, ConfigModule.forRoot(), SmsModule, OtpModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
