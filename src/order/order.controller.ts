import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/decorator/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleAuthGuard } from 'src/auth/guards/role-jwt.gaurd';
import { buildPagination } from 'src/comon/comon';
import { ParamPaginationDto } from 'src/comon/param-pagination.dto';
import { Order } from './model/order.schema';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAll(@Query() params: ParamPaginationDto) {
    const products = await this.service.findAll(params);
    return buildPagination<Order>(products, params);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getOneByCustomer(@Request() req) {
    const { _id } = req.user;
    return await this.service.findByCustomer(_id);
  }

  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
}
