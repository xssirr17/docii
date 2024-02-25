import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type categoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ required: true, default: 'pk', unique: true })
  name: string;

  @Prop()
  link: string;

  @Prop()
  description: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
