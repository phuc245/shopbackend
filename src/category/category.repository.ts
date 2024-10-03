import { Injectable } from '@nestjs/common';
import { Category } from './model/category.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private readonly model: Model<Category>,
  ) {}

  async create(category: CreateCategoryDto) {
    const newCategory = await new this.model({
      _id: new Types.ObjectId(),
      ...category,
    }).save();

    if (newCategory.parent_id) {
      await this.model
        .findOneAndUpdate(
          { _id: newCategory.parent_id },
          { $addToSet: { children: newCategory._id } },
          { new: true },
        )
        .lean<Category>(true);
    }
    return newCategory;
  }

  // tìm kiếm theo id
  async findOne(id: string) {
    return await this.model
      .findOne({ _id: id })
      .populate({
        path: 'children',
        populate: {
          path: 'children',
          populate: { path: 'children', populate: { path: 'children' } },
        },
      })
      .lean<Category>(true);
  }

  //tìm tất cả danh mục
  async findAll() {
    return await this.model
      .find({ parent_id: null })
      .populate({
        path: 'children',
        populate: {
          path: 'children',
          populate: { path: 'children', populate: { path: 'children' } },
        },
      })
      .lean<Category>(true);
  }

  // Xóa 1 danh mục
  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id }).lean<Category>(true);
  }

  // Thay đổi 1 danh mục
  async updateOne(
    id: string,
    categoryOld: Category,
    categoryNew: UpdateCategoryDto,
  ) {
    const updateCategory = await this.model
      .findOneAndUpdate({ _id: id }, categoryNew, {
        new: true,
      })
      .lean<Category>(true);

    if (categoryNew.parent_id) {
      await this.model.updateOne(
        { _id: updateCategory.parent_id },
        { $addToSet: { children: updateCategory._id } },
      );
    }

    if (
      categoryOld.parent_id.toString() &&
      categoryOld.parent_id.toString() !== categoryNew.parent_id
    ) {
      await this.model.updateOne(
        { _id: categoryOld.parent_id },
        { $pull: { children: categoryOld._id } },
      );
    }

    return updateCategory;
  }

  // Thay đổi trạng thái theo id
  async updateStatusById(id: string, status: boolean) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { status }, { new: true })
      .lean<Category>(true);
  }
}
