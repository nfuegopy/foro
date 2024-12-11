// src/modules/categories/repositories/category.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async createCategory(data: Partial<Category>): Promise<Category> {
    const category = this.categoryRepo.create(data);
    return await this.categoryRepo.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepo.find();
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepo.findOne({ where: { id } });
  }

  async updateCategory(id: number, data: Partial<Category>): Promise<Category> {
    const category = await this.findOne(id);
    if (!category) return null;
    Object.assign(category, data);
    return await this.categoryRepo.save(category);
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await this.categoryRepo.delete(id);
    return result.affected > 0;
  }
}
