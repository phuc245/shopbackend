import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ versionKey: false })
export class DiscountCode {
  @Prop({ type: String, unique: true })
  code: string; // Mã giảm giá

  @Prop({ type: Number, min: 0 })
  discount_value: number; // Giá trị giảm giá

  @Prop({ type: Date, default: Date.now })
  created_at: Date; // Ngày tạo mã

  @Prop({ type: Date, required: true })
  expiration_date: Date; // Ngày hết hạn mã
}

export const DiscountCodeSchema = SchemaFactory.createForClass(DiscountCode);
