import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './product/product.module';
import { CloudiaryModule } from './cloudiary/cloudiary.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    CategoryModule,
    ProductsModule,
    CloudiaryModule,
    CustomerModule,
  ],
})
export class AppModule {}
