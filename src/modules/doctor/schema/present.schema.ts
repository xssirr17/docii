import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type presentsDocument = HydratedDocument<Presents>;

@Schema()
export class Presents {
  @Prop({ required: true })
  time: Date;

  @Prop()
  patientId: string;

  @Prop({ required: true })
  doctorId: string;

  @Prop({ required: true, unique: true })
  id: string;
}
export const PresentsSchema = SchemaFactory.createForClass(Presents);
