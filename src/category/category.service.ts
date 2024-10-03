import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Types } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  // tạo 1 danh mục
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { name, status, parent_id } = createCategoryDto;

    const checkParent = parent_id !== '' ? parent_id : null;

    try {
      if (parent_id !== '') {
        const idValid = Types.ObjectId.isValid(parent_id);
        if (!idValid) {
          throw new UnprocessableEntityException('parent_id khong hop le');
        }

        const parent = await this.repository.findOne(parent_id);
        if (!parent) {
          throw new NotFoundException('Không tìm thấy category id');
        }
      }
      return await this.repository.create({
        name,
        status,
        parent_id: checkParent,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  // tìm tất cả danh mục
  findAll() {
    return this.repository.findAll();
  }

  // tìm kiếm theo id
  async findById(id: string) {
    const category = await this.repository.findOne(id);
    if (!category) {
      throw new NotFoundException('không tìm thấy danh mục');
    }

    return category;
  }

  // Hàm xóa Id k có danh mục con
  async deleteById(id: string) {
    const category = await this.findById(id);

    if (category.children.length > 0) {
      throw new UnprocessableEntityException(
        'Category này vẫn còn danh mục con',
      );
    }

    await this.repository.deleteOne(category._id.toHexString());

    return category;
  }

  // Thay đổi 1 danh mục
  async updateById(id: string, categoryUpdate: UpdateCategoryDto) {
    const { name, status, parent_id } = categoryUpdate;
    const checkParent = parent_id !== '' ? parent_id : null;

    if (parent_id !== '') {
      const idValid = Types.ObjectId.isValid(parent_id);
      if (!idValid) {
        throw new UnprocessableEntityException('parent_id khong hop le');
      }

      const parent = await this.repository.findOne(parent_id);
      if (!parent) {
        throw new NotFoundException('Không tìm thấy category id');
      }
    }

    const idValid = Types.ObjectId.isValid(id);
    if (!idValid) {
      throw new UnprocessableEntityException('id khong hop le');
    }

    const category = await this.findById(id);
    if (category.children.length > 0) {
      throw new UnprocessableEntityException(
        'Danh muc co danh muc con, không thể thay đổi lại',
      );
    }
    return await this.repository.updateOne(id, category, {
      name,
      status,
      parent_id: checkParent,
    });
  }

  // Thay đổi trạng thái theo id
  async updateStatusById(id: string, status: boolean) {
    const idValid = Types.ObjectId.isValid(id);
    if (!idValid) {
      throw new UnprocessableEntityException('id này khong hop le');
    }

    const category = await this.repository.updateStatusById(id, status);
    if (!category) {
      throw new NotFoundException('không tìm thấy id danh mục');
    }

    return category;
  }
}
