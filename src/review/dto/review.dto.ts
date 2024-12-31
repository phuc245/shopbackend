import { Max, Min } from 'class-validator';

export class CreateReviewDto {
  product_id: string; // Liên kết với product

  user_id: string; // Liên kết với người dùng

  content: string; // Nội dung đánh giá

  @Min(1)
  @Max(5)
  rating: number; // Đánh giá (từ 1 đến 5 sao)
}

export class UpdateReviewDto {
  content?: string;

  @Min(1)
  @Max(5)
  rating?: number;
}
