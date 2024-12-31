import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartDto, AddCartMultipleDto } from './dto/add-cart.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addToCart(@Request() req, @Body() cart: AddCartDto) {
    const _id = req.user._id;

    return this.cartService.addCart(_id, cart);
  }

  // API thêm nhiều sản phẩm vào giỏ hàng (combo)
  @UseGuards(JwtAuthGuard)
  @Post('multiple')
  addMultipleToCart(
    @Request() req,
    @Body() addCartMultipleDto: AddCartMultipleDto,
  ) {
    const _id = req.user._id;
    return this.cartService.addMultipleToCart(
      _id,
      addCartMultipleDto.cartItems,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getCart(@Request() req) {
    const _id = req.user._id;

    return this.cartService.findByCustomer(_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('product/:id')
  deleteCart(@Request() req, @Param('id') product_id: string) {
    const _id = req.user._id;

    return this.cartService.deleteByCustomerAndProduct(_id, product_id);
  }
}
