import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { get } from 'mongoose';
import { ParamPaginationDto } from './dto/param-pagination.dto';
import { User } from './model/user.schema';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Role } from 'src/auth/decorator/role.enum';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RoleAuthGuard } from 'src/auth/guards/role-jwt.gaurd';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  // Tạo User
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
  }

  // Lấy tất cả, có tìm kiếm
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getAllUsers(@Query() page: ParamPaginationDto) {
    const listUsers = await this.service.getAll(page);
    return this.buildPagination(listUsers, page);
  }

  // Sửa User
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  updateUser(@Param('id') _id: string, @Body() updateUser: UpdateUserDto) {
    return this.service.updateUser(_id, updateUser);
  }

  // Xóa User
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id') _id: string) {
    await this.service.deleteUser(_id);

    return 'Xoá user thành công!';
  }
  
  // Lay User theo ID
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  getUserById(@Param('id') _id: string) {
    return this.service.getOne(_id);
  }

  //Thay đổi User theo Id
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Put(':id/status')
  async updatupdateStatusUser(@Param('id') _id: string, @Query('status') status: boolean) {
    const user =  await this.service.updateStatusUser(_id, status);
    console.log(user)
    return user
  }

  private buildPagination(listUsers: User[], param: ParamPaginationDto) {
    const { page, limit } = param;
    return {
      total_items: listUsers.length,
      total_pages: Math.ceil(listUsers.length / limit),
      current_page: parseInt(String(page)),
      entities: listUsers,
    };
  }
}
