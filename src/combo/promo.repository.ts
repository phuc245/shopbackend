// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';

// import { Model, Types } from 'mongoose';
// import { ProductRepository } from 'src/product/product.repository'; // Import Product Repository
// import { Combo } from './model/promo.schema';

// @Injectable()
// export class ComboRepository {
//   constructor(
//     @InjectModel(Combo.name) private readonly model: Model<Combo>,
//     private readonly productRepository: ProductRepository, // Inject ProductRepository
//   ) {}

//   // Tìm các sản phẩm từ mảng ID sản phẩm
//   async findProductsByIds(productIds: Types.ObjectId[]) {
//     return this.productRepository.findByIds(productIds);
//   }

//   // Tạo mới Combo
//   async create(comboData: Combo) {
//     const combo = new this.model(comboData);
//     return await combo.save();
//   }

//   // Cập nhật Combo
//   async updateOne(id: string, updateData: Partial<Combo>) {
//     return this.model
//       .findByIdAndUpdate(id, updateData, { new: true })
//       .lean<Combo>();
//   }

//   // Tìm một Combo theo ID
//   async findOne(id: string) {
//     return this.model.findById(id).lean<Combo>();
//   }

//   // Tìm tất cả các Combo
//   async findAll(page: number, limit: number, sort: string, keyword: string) {
//     return this.model
//       .find({
//         $or: [
//           { name: new RegExp(keyword, 'i') },
//           { description: new RegExp(keyword, 'i') },
//         ],
//       })
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .sort({ createdAt: sort })
//       .lean<Combo[]>();
//   }

//   // Xóa một Combo theo ID
//   async deleteOne(id: string) {
//     return this.model.findByIdAndDelete(id).lean<Combo>();
//   }
// }
