import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MongoModule } from './databases/mongo/mongo.module';
import { UserModule } from './modules/user/user.module';
import { OtpService } from './services/otp/otp.service';

@Module({
  imports: [AuthModule, MongoModule, UserModule],
  controllers: [],
  providers: [OtpService],
})
export class AppModule {}
