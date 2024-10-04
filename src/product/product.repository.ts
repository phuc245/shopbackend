import { Injectable } from '@nestjs/common';
import { Product } from './model/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private readonly model: Model<Product>,
  ) {}

  create(product: Product) {
    return new this.model({
      ...product,
    }).save();
  }

  async uploadMainFile(
    id: Types.ObjectId,
    { image_id, image_url }: { image_id: string; image_url: string },
  ) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { image_id, image_url }, { new: true })
      .lean<Product>(true);
  }

  async uploadExtraFiles(
    id: Types.ObjectId,
    files: { image_id: string; image_url: string },
  ) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { $push: { images: files } })
      .lean<Product>(true);
  }

  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ) {
    return await this.model
      .find(keyword ? { $or: [{ name: new RegExp(keyword, 'i') }] } : {})
      .skip((page - 1) * limit)
      .sort({ name: sort })
      .limit(limit)
      .populate('category_id')
      .lean<Product[]>(true);
  }

  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id }).lean<Product>(true);
  }
}
