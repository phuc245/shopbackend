import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';
import { checkValisIsObject } from 'src/comon/comon';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async createReview(createReviewDto: CreateReviewDto) {
    const review = {
      ...createReviewDto,
      product_id: new Types.ObjectId(createReviewDto.product_id),
      user_id: new Types.ObjectId(createReviewDto.user_id),
    };
    return this.reviewRepository.create(review);
  }

  async getReviewsByProduct(product_id: string) {
    return this.reviewRepository.findByProductId(product_id);
  }

  async updateReview(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.updateById(id, updateReviewDto);
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  async deleteReview(id: string) {
    // Kiểm tra tính hợp lệ của ObjectId
    checkValisIsObject(id, 'review id');

    // Xóa review
    const review = await this.reviewRepository.deleteById(id);

    // Nếu không tìm thấy review, ném lỗi NotFound
    if (!review) {
      throw new NotFoundException('Không tìm thấy review');
    }

    return review;
  }

  async getAllReviews() {
    return this.reviewRepository.findAll();
  }
}
