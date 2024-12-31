import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';
import { RoleAuthGuard } from 'src/auth/guards/role-jwt.gaurd';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto, @Request() req) {
    const userId = req.user.id; // Lấy `user_id` từ thông tin người dùng trong JWT
    return this.reviewService.createReview({
      ...createReviewDto,
    });
  }

  @Get('product/:product_id')
  async getReviewsByProduct(@Param('product_id') product_id: string) {
    return this.reviewService.getReviewsByProduct(product_id);
  }

  @Get()
  async getAllReviews() {
    return this.reviewService.getAllReviews();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteReview(@Param('id') id: string) {
    return this.reviewService.deleteReview(id);
  }
}
