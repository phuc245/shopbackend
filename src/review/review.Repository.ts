import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review } from './model/review.schema';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel(Review.name) private readonly model: Model<Review>,
  ) {}

  async create(review: Partial<Review>) {
    return new this.model(review).save();
  }

  async findByProductId(productId: string) {
    return this.model
      .find({ product_id: productId })
      .populate('user_id', 'name email') // Thêm thông tin người dùng nếu cần
      .lean<Review[]>(true);
  }

  async deleteById(id: string) {
    return this.model.findByIdAndDelete(id).lean<Review>(true);
  }

  async updateById(id: string, updateData: Partial<Review>) {
    return this.model
      .findByIdAndUpdate(id, updateData, { new: true })
      .lean<Review>(true);
  }
  async findAll() {
    return this.model
      .find()
      .populate('user_id', 'name email') // Nếu cần, thêm thông tin user
      .populate('product_id', 'name')
      .lean<Review[]>(true);
  }
}
