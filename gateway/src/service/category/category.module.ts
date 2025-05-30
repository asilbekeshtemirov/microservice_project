import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryClient } from './category.client';
import { ProductClient } from '../product/product.client';

@Module({
  providers: [CategoryService, CategoryClient, ProductClient],
  controllers: [CategoryController],
})
export class CategoryModule {}
