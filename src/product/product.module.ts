import { Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DatabaseModule } from 'src/database/database.module';
import { Product, ProductSchema } from './model/product.schema';

import { CloudiaryModule } from 'src/cloudiary/cloudiary.module';
import { Category } from 'src/category/model/category.schema';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CloudiaryModule,
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService],
})
export class ProductsModule {}
