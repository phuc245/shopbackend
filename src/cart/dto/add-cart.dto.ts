export class AddCartDto {
  product_id: string;
  quantity: number;
}
// Dành cho nhiều sản phẩm (combo)
export class AddCartMultipleDto {
  cartItems: AddCartDto[]; // Một mảng các AddCartDto cho mỗi sản phẩm
}
