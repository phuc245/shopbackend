import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { DiscountCode } from './model/create-discount.schema';

@Injectable()
export class DiscountCodeRepository {
  constructor(
    @InjectModel(DiscountCode.name)
    private readonly discountCodeModel: Model<DiscountCode>,
  ) {}

  // Kiểm tra mã giảm giá có hợp lệ không
  async validateDiscountCode(code: string): Promise<DiscountCode | null> {
    const discountCode = await this.discountCodeModel
      .findOne({
        code,
        expiration_date: { $gt: new Date() }, // Kiểm tra ngày hết hạn
      })
      .lean();

    return discountCode;
  }
}
