import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Review {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  product_id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Customer', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Number, min: 1, max: 5, required: true })
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
