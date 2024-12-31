import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/product/model/product.schema';

import { ComboService } from './promo.service';
import { ComboSchema } from './model/combo.schema'; // Import ComboSchema thay vì ComboModel
import { ComboController } from './promo.contoller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'), // Cấu hình MongoDB
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema }, // Kết nối schema Product
      { name: 'Combo', schema: ComboSchema }, // Kết nối schema Combo
    ]),
  ],
  controllers: [ComboController],
  providers: [ComboService],
  exports: [ComboService],
})
export class ComboModule {}
