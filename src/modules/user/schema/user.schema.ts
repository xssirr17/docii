import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  mobileNumber: string;

  @Prop({ required: true, default: 'pk', unique: true })
  nationalId: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  joinAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
