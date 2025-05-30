import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './model/category.model';
import { UpdateCategoryDto, CreateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private model: Model<Category>) { }

    async create(dto: CreateCategoryDto): Promise<Category> {
        return this.model.create(dto);
    }

    async findAll(): Promise<Category[]> {
        return this.model.find();
    }

    async findOne(id: string): Promise<Category> {
        const category = await this.model.findById(id);
        if (!category) throw new NotFoundException('Topilmadi');
        return category;
    }

    async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
        const updated = await this.model.findByIdAndUpdate(id, dto, { new: true });
        if (!updated) throw new NotFoundException('Topilmadi');
        return updated;
    }

    async delete(id: string): Promise<void> {
        const res = await this.model.findByIdAndDelete(id);
        if (!res) throw new NotFoundException('Topilmadi');
    }
}
