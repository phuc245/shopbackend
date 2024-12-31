import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Combo } from './model/combo.schema'; // Import Combo interface
import { Product } from 'src/product/model/product.schema'; // Import Product model
import { CreateComboDTO } from './dto/combo.dto';

@Injectable()
export class ComboService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel('Combo') private comboModel: Model<Combo>, // Inject model Combo
  ) {}

  // Tạo combo mới
  async createCombo(createComboDTO: CreateComboDTO) {
    const { name, products } = createComboDTO;

    console.log('Received combo data:', createComboDTO);

    if (!name || typeof name !== 'string') {
      throw new Error('Combo name is required and must be a string.');
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      throw new Error('Combo must have a valid products array.');
    }

    let totalProductPrice = 0;

    try {
      for (const productInCombo of products) {
        const product = await this.productModel
          .findById(productInCombo.product_id)
          .select('price');
        if (!product) {
          throw new Error(
            `Product with ID ${productInCombo.product_id} not found`,
          );
        }

        if (productInCombo.quantity <= 0) {
          throw new Error('Product quantity must be greater than 0.');
        }

        totalProductPrice += product.price * productInCombo.quantity;
      }

      const discount = Math.min(
        Math.floor(Math.random() * 10000) + 10000,
        totalProductPrice,
      );
      const finalPrice = totalProductPrice - discount;

      if (finalPrice <= 0) {
        throw new Error('Final price must be greater than 0 after discount.');
      }

      const newCombo = new this.comboModel({
        name,
        price: finalPrice,
        products,
      });

      return await newCombo.save();
    } catch (error) {
      console.error('Error creating combo:', error.message);
      throw new Error(`Error creating combo: ${error.message}`);
    }
  }

  // Lấy tất cả combo
  async getAllCombos() {
    try {
      return await this.comboModel.find().populate('products.product_id');
    } catch (error) {
      console.error('Error fetching combos:', error.message);
      throw new Error(`Error fetching combos: ${error.message}`);
    }
  }

  // Xóa combo theo ID
  async deleteCombo(id: string) {
    try {
      const result = await this.comboModel.findByIdAndDelete(id);
      if (!result) {
        throw new Error('Combo not found');
      }
      return result;
    } catch (error) {
      console.error('Error deleting combo:', error.message);
      throw new Error(`Error deleting combo: ${error.message}`);
    }
  }

  // Xóa nhiều combo
  async deleteCombos(ids: string[]) {
    try {
      const results = await this.comboModel.deleteMany({ _id: { $in: ids } });
      return results.deletedCount > 0 ? ids : null;
    } catch (error) {
      console.error('Error deleting combos:', error.message);
      throw new Error(`Error deleting combos: ${error.message}`);
    }
  }
}
