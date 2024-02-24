import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type doctorDocument = HydratedDocument<Doctor>;

@Schema()
export class Doctor {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  categories: Array<string>;

  @Prop({ required: true })
  biographi: string;

  @Prop({ required: true, default: 'pk', unique: true })
  id: string;

  @Prop()
  link: string;

  @Prop()
  score: number;

  @Prop()
  history: number;

  @Prop()
  followers: Array<string>;

  @Prop({ required: true })
  joinAt: Date;
}
export const DoctorSchema = SchemaFactory.createForClass(Doctor);
