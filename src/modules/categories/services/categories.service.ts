// src/modules/categories/services/categories.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(data: Partial<Category>): Promise<Category> {
    if (!data.name || data.name.trim() === '') {
      throw new BadRequestException('Name is required');
    }
    // Podrías verificar si ya existe una categoria con ese nombre:
    const exists = await this.categoryRepository.findAll();
    if (exists.some((cat) => cat.name === data.name)) {
      throw new BadRequestException('Category name already exists');
    }
    return this.categoryRepository.createCategory(data);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: number, data: Partial<Category>): Promise<Category> {
    if (data.name && data.name.trim() === '') {
      throw new BadRequestException('Name cannot be empty');
    }
    const category = await this.categoryRepository.updateCategory(id, data);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async remove(id: number): Promise<void> {
    const deleted = await this.categoryRepository.deleteCategory(id);
    if (!deleted) {
      throw new NotFoundException('Category not found');
    }
  }
}
