import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductDto ,UpdateProductDto } from './dto';
import { DeleteResult } from 'typeorm'; 

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'create_product' })
  create(dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @MessagePattern({ cmd: 'get_products' })
  findAll() {
    return this.productService.findAll();
  }

  @MessagePattern({ cmd: 'get_product' })
  findOne(id: number) {
    return this.productService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_product' })
  update(data: { id: number; dto: UpdateProductDto }) {
    return this.productService.update(data.id, data.dto);
  }

  @MessagePattern({ cmd: 'delete_product' })
  remove(id: number): Promise<DeleteResult> { 
    return this.productService.remove(id);
  }
}
