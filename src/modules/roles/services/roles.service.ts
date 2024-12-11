import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { RoleRepository } from '../repositories/role.repository';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(data: Partial<Role>): Promise<Role> {
    if (!data.name || data.name.trim() === '') {
      throw new BadRequestException('Name is required');
    }

    const existing = await this.roleRepository.findByName(data.name);
    if (existing) {
      throw new BadRequestException('Role name already exists');
    }

    return this.roleRepository.createRole(data);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne(id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async update(id: number, data: Partial<Role>): Promise<Role> {
    if (data.name && data.name.trim() === '') {
      throw new BadRequestException('Name cannot be empty');
    }

    // Si se actualiza el nombre, verificar que no exista duplicado
    if (data.name) {
      const existing = await this.roleRepository.findByName(data.name);
      if (existing && existing.id !== id) {
        throw new BadRequestException('Role name already exists');
      }
    }

    const role = await this.roleRepository.updateRole(id, data);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async remove(id: number): Promise<void> {
    const deleted = await this.roleRepository.deleteRole(id);
    if (!deleted) {
      throw new NotFoundException('Role not found');
    }
  }
}
