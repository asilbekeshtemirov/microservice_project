import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductClient } from './product.client';

@Module({
  controllers: [ProductController ],
  providers: [ProductService, ProductClient],
})
export class ProductModule {}
