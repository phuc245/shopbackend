import { UpdateCategoryDto } from './dto/update-category.dto';
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
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { RoleAuthGuard } from 'src/auth/guards/role-jwt.gaurd';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  //@UseGuards(jwtAuthGuard)
  @Post()
  createDanhMuc(@Body() category: CreateCategoryDto) {
    return this.service.createCategory(category);
  }

  //@UseGuards(jwtAuthGuard)
  @Get()
  findAllDanhMuc() {
    return this.service.findAll();
  }

  //@UseGuards(jwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  //@UseGuards(jwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.service.deleteById(id);
  }

  //@UseGuards(jwtAuthGuard)
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() category: UpdateCategoryDto) {
    return this.service.updateById(id, category);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Query('status') status: boolean) {
    return this.service.updateStatusById(id, status);
  }
}
