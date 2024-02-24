import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type categoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 'pk', unique: true })
  id: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  description: Date;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
