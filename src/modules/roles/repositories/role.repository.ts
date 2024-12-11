import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async createRole(data: Partial<Role>): Promise<Role> {
    const role = this.roleRepo.create(data);
    return this.roleRepo.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepo.find();
  }

  async findOne(id: number): Promise<Role> {
    return this.roleRepo.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Role> {
    return this.roleRepo.findOne({ where: { name } });
  }

  async updateRole(id: number, data: Partial<Role>): Promise<Role> {
    const role = await this.findOne(id);
    if (!role) return null;
    Object.assign(role, data);
    return this.roleRepo.save(role);
  }

  async deleteRole(id: number): Promise<boolean> {
    const result = await this.roleRepo.delete(id);
    return result.affected > 0;
  }
}
