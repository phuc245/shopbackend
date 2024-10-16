import { Module } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Cart, CartSchema } from './model/cart.schema';
import { ProductsModule } from 'src/product/product.module';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    ProductsModule,
  ],
  controllers: [CartController],
  providers: [CartRepository, CartService],
  exports: [CartService],
})
export class CartModule {}
