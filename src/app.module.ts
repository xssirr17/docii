import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MongoModule } from './databases/mongo/mongo.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AuthModule, MongoModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
