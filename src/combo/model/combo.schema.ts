import { Schema, Document, model } from 'mongoose';

// Định nghĩa interface cho Combo (Document của Mongoose)
export interface Combo extends Document {
  name: string;
  price: number;
  products: { product_id: string; quantity: number }[]; // Mảng sản phẩm trong combo
}

// Schema cho sản phẩm trong combo
const productInComboSchema = new Schema(
  {
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }, // Không tạo _id cho từng sản phẩm trong combo
);

// Schema cho combo
export const ComboSchema = new Schema<Combo>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    products: { type: [productInComboSchema], required: true },
  },
  { timestamps: true },
);
export const ComboModel = model<Combo>('Combo', ComboSchema);
