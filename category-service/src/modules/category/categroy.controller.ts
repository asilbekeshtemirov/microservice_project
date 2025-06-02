import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Controller()
export class CategoryController {
  constructor(private service: CategoryService) {}

  @MessagePattern({ cmd: 'create-category' })
  create(dto: CreateCategoryDto) {
    return this.service.create(dto);
  }

  @MessagePattern({ cmd: 'get-categories' })
  findAll() {
    return this.service.findAll();
  }

  @MessagePattern({ cmd: 'get-category' })
  findOne(id: string) {
    return this.service.findOne(id);
  }

  @MessagePattern({ cmd: 'update-category' })
  update(data: { id: string; dto: UpdateCategoryDto }) {
    return this.service.update(data.id, data.dto);
  }

  @MessagePattern({ cmd: 'delete-category' })
  delete(id: string) {
    return this.service.delete(id);
  }
}
