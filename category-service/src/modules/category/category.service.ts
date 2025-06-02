import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './model/category.model';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private model: Model<Category>) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    return this.model.create(dto);
  }

  async findAll(): Promise<Category[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.model.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category with id "${id}" not found`);
    }
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const updated = await this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException(`Cannot update. Category with id "${id}" not found`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.model.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Cannot delete. Category with id "${id}" not found`);
    }
  }
}
