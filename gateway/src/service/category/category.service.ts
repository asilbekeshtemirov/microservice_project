import { Injectable } from '@nestjs/common';
import { CategoryClient } from './category.client';
import { ProductClient } from '../product/product.client';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CategoryService {
  constructor(
    private readonly client: CategoryClient,
    private readonly productClient: ProductClient,
  ) {}

  async create(dto: CreateCategoryDto) {
    return firstValueFrom(
      this.client.getClient().send({ cmd: 'create-category' }, dto),
    );
  }

  async findAll() {
    const res: any[] = [];
  
    const categories = await firstValueFrom(
      this.client.getClient().send({ cmd: 'get-categories' }, {}),
    );
  
    console.log('Categories from service:', categories);
  
    const categoriesList = Array.isArray(categories) ? categories : categories.data;
  
    for (const category of categoriesList) {
      console.log('Processing category:', category);
  
      const products = await firstValueFrom(
        this.productClient.getClient().send({ cmd: 'get_products_by_category' }, category._id),
      );
  
      console.log(`Products for category ${category._id}:`, products);
  
      res.push({ ...category, products });
      console.log('Processing category:', products);

    }
  
    return {
      count: res.length,
      data: res,
    };
  }
  

  async findOne(id: string) {
    return firstValueFrom(
      this.client.getClient().send({ cmd: 'get-category' }, id),
    );
  }

  async update(id: string, dto: UpdateCategoryDto) {
    return firstValueFrom(
      this.client.getClient().send({ cmd: 'update-category' }, { id, dto }),
    );
  }

  async delete(id: string) {
    return firstValueFrom(
      this.client.getClient().send({ cmd: 'delete-category' }, id),
    );
  }
}
