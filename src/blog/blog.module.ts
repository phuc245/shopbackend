import { Module } from '@nestjs/common';
import { BlogController } from 'src/blog/blog.controller';
import { BlogRepository } from 'src/blog/blog.repository';
import { BlogService } from 'src/blog/blog.service';
import { CloudiaryModule } from 'src/cloudiary/cloudiary.module';
import { DatabaseModule } from 'src/database/database.module';
import { Blog, BlogSchema } from './model/blog.shema';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    CloudiaryModule,
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
})
export class BlogModule {}
