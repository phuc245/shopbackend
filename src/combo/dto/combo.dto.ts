// src/dto/combo.dto.ts

import { ProductInComboDTO } from './productInCombo.dto';
import { ObjectId } from 'mongoose'; // Import ObjectId từ mongoose

export class CreateComboDTO {
  name: string; // Tên combo
  price: number; // Giá combo sau khi giảm
  products: ProductInComboDTO[]; // Mảng các sản phẩm trong combo
}
