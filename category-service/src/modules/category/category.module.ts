import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './model/category.model';
import { CategoryService } from './category.service';
import { CategoryController } from './categroy.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])
  ],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
