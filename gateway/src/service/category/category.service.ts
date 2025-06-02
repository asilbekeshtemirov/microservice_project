import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    try {
      return await firstValueFrom(
        this.client.getClient().send({ cmd: 'create-category' }, dto),
      );
    } catch (err) {
      throw new InternalServerErrorException('Kategoriya yaratishda xatolik yuz berdi');
    }
  }

  async findAll() {
    try {
      const categories = await firstValueFrom(
        this.client.getClient().send({ cmd: 'get-categories' }, {}),
      );
  
      const categoriesList = Array.isArray(categories)
        ? categories
        : categories?.data ?? [];
  
      const result = await Promise.all(
        categoriesList.map(async (category: any) => {
          const products = await firstValueFrom(
            this.productClient.getClient().send(
              { cmd: 'get_products_by_category' },
              category._id,
            ),
          );
          console.log(products);
          
          return {
            ...category,
            products,
          };
        }),
      );
  
      return {
        count: result.length,
        data: result,
      };
    } catch (err) {
      console.error('Category + Products xatosi:', err);
      throw new InternalServerErrorException('Kategoriyalarni olishda xatolik yuz berdi');
    }
  }
  


  async findOne(id: string) {
    try {
      return await firstValueFrom(
        this.client.getClient().send({ cmd: 'get-category' }, id),
      );
    } catch (err) {
      throw new InternalServerErrorException(`Kategoriya topilmadi: ${id}`);
    }
  }

  async update(id: string, dto: UpdateCategoryDto) {
    try {
      return await firstValueFrom(
        this.client.getClient().send({ cmd: 'update-category' }, { id, dto }),
      );
    } catch (err) {
      throw new InternalServerErrorException(`Kategoriya yangilanishida xatolik: ${id}`);
    }
  }

  async delete(id: string) {
    try {
      const category = await firstValueFrom(
        this.client.getClient().send({ cmd: 'get-category' }, id),
      );

      if (!category) {
        throw new NotFoundException('Kategoriya topilmadi');
      }

      try {
        await firstValueFrom(
          this.productClient.getClient().send({ cmd: 'delete_products_by_category' }, id),
        );
      } catch (err) {
        console.error('Kategoriya mahsulotlarini o‘chirishda xato:', err);
      }

      await firstValueFrom(
        this.client.getClient().send({ cmd: 'delete-category' }, id),
      );

      return { message: 'Kategoriya muvaffaqiyatli o‘chirildi' };

    } catch (err) {
      console.error(`Kategoriya o‘chirishda xatolik: ${id}`, err);
      throw new InternalServerErrorException(`Kategoriya o‘chirishda xatolik yuz berdi`);
    }
  }
}
