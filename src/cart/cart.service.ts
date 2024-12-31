import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CartRepository } from 'src/cart/cart.repository';
import { AddCartDto } from 'src/cart/dto/add-cart.dto';
import { Cart } from 'src/cart/model/cart.schema';
import { ProductRepository } from 'src/product/product.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly repository: CartRepository,
    private readonly productRepo: ProductRepository,
  ) {}

  async addCart(customer_id: string, addCart: AddCartDto) {
    // Lấy sản phẩm từ repo
    const product = await this.productRepo.findOne(addCart.product_id);

    // Kiểm tra xem sản phẩm có tồn tại không
    if (!product) {
      throw new BadRequestException('Sản phẩm không tồn tại');
    }

    const cart = await this.repository.findByCustomerAndProduct(
      customer_id,
      addCart.product_id,
    );

    if (!cart) {
      if (product.stock < addCart.quantity) {
        throw new BadRequestException('Sản phẩm không đủ');
      }
      const newCart: Cart = {
        _id: new Types.ObjectId(),
        customer_id: new Types.ObjectId(customer_id),
        product_id: new Types.ObjectId(addCart.product_id),
        quantity: addCart.quantity,
      };
      return await this.repository.create(newCart);
    }

    if (cart.quantity + addCart.quantity <= 0) {
      throw new BadRequestException('Số lượng sản phẩm phải lớn hơn 0');
    }

    if (cart.quantity + addCart.quantity > product.stock) {
      throw new BadRequestException('Sản phẩm không đủ');
    }

    return await this.repository.addCartByCustomerAndProduct(
      customer_id,
      addCart,
    );
  }

  async addMultipleToCart(customer_id: string, addCartItems: AddCartDto[]) {
    if (!Types.ObjectId.isValid(customer_id)) {
      throw new BadRequestException('Customer ID không hợp lệ');
    }

    const results = [];

    for (const addCart of addCartItems) {
      if (!Types.ObjectId.isValid(addCart.product_id)) {
        throw new BadRequestException(
          `Product ID ${addCart.product_id} không hợp lệ`,
        );
      }

      const product = await this.productRepo.findOne(addCart.product_id);

      if (!product) {
        throw new BadRequestException(
          `Sản phẩm với ID ${addCart.product_id} không tồn tại`,
        );
      }

      if (product.stock < addCart.quantity) {
        throw new BadRequestException(
          `Sản phẩm với ID ${addCart.product_id} không đủ kho`,
        );
      }

      const cart = await this.repository.findByCustomerAndProduct(
        customer_id,
        addCart.product_id,
      );

      if (!cart) {
        const newCart: Cart = {
          _id: new Types.ObjectId(),
          customer_id: new Types.ObjectId(customer_id),
          product_id: new Types.ObjectId(addCart.product_id),
          quantity: addCart.quantity,
        };
        results.push(await this.repository.create(newCart));
      } else {
        if (cart.quantity + addCart.quantity > product.stock) {
          throw new BadRequestException(
            `Sản phẩm với ID ${addCart.product_id} không đủ kho`,
          );
        }
        results.push(
          await this.repository.addCartByCustomerAndProduct(
            customer_id,
            addCart,
          ),
        );
      }
    }

    return results;
  }

  async findByCustomer(customer_id: string) {
    return await this.repository.findByCustomer(customer_id);
  }

  async deleteByCustomerAndProduct(customer_id: string, product_id: string) {
    const cart = await this.repository.deleteByCustomerAndProduct(
      customer_id,
      product_id,
    );
    if (!cart) {
      throw new BadRequestException('Không tìm thấy cart');
    }
    return cart;
  }

  async deleteCartCustomer(customer_id: string) {
    return await this.repository.deleteByCustomer(customer_id);
  }
}
