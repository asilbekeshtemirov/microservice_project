import { Injectable } from '@nestjs/common';
import { ProductClient } from './product.client';
import { CreateProductDto, UpdateProductDto } from './dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(private readonly client: ProductClient) {}

  async create(dto: CreateProductDto) {
    return firstValueFrom(
      this.client.getClient().send({ cmd: 'create_product' }, dto),
    );
  }

  async findAll() {
    return firstValueFrom(
      this.client.getClient().send({ cmd: 'get_products' }, {}),
    );
  }

  async findOne(id: string) {
    return firstValueFrom(
      this.client.getClient().send({ cmd: 'get_product' }, id),
    );
  }

  async findByCategoryId(categoryId: string) {
    return firstValueFrom(
      this.client.getClient().send({ cmd: 'get_products_by_category' }, categoryId),
    );
  }

  async update(id: string, dto: UpdateProductDto) {
    return firstValueFrom(
      this.client.getClient().send({ cmd: 'update_product' }, { id, dto }),
    );
  }

  async remove(id: string) {
    return firstValueFrom(
      this.client.getClient().send({ cmd: 'delete_product' }, id),
    );
  }
}
