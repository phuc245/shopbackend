import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { DatabaseModule } from 'src/database/database.module';
import { Category, CategorySchema } from './model/category.schema';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  exports: [CategoryRepository],
})
export class CategoryModule {}
