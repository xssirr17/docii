import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DATABASE_URI,
        useNewUrlParser: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class MongoModule {}
