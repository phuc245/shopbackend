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
import { ParamPaginationDto } from 'src/comon/param-pagination.dto';
import { buildPagination } from 'src/comon/comon';
import { Category } from './model/category.schema';

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
  async getAll(@Query() params: ParamPaginationDto) {
    const categories = await this.service.findAll(params);

    const rootCategories = categories.filter((category) => {
      return category.parent_id === null;
    });

    return buildPagination<Category>(categories, params, rootCategories);
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
