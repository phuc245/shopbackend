import { ObjectId, Types } from 'mongoose'; // Đảm bảo rằng bạn đã import ObjectId từ mongoose

export class ProductInComboDTO {
  product_id: Types.ObjectId; // ID của sản phẩm (ObjectId tham chiếu đến bảng Product)
  quantity: number; // Số lượng sản phẩm trong combo
}
