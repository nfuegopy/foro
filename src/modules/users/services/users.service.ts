import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { RolesService } from '../../roles/services/roles.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rolesService: RolesService,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    // Validaciones básicas
    if (!data.username || !data.email || !data.password_hash) {
      throw new BadRequestException(
        'Username, email, and password are required',
      );
    }

    // Verificar duplicados
    const existingUserByUsername = await this.userRepository.findByUsername(
      data.username,
    );
    if (existingUserByUsername) {
      throw new BadRequestException('Username is already taken');
    }

    const existingUserByEmail = await this.userRepository.findByEmail(
      data.email,
    );
    if (existingUserByEmail) {
      throw new BadRequestException('Email is already taken');
    }

    // Verificar que el rol existe
    if (data.roleId) {
      await this.rolesService.findOne(data.roleId);
    } else {
      // Asignar rol por defecto (asumiendo que 3 es el ID del rol 'user')
      data.roleId = 3;
    }

    // Hashear el password
    data.password_hash = await bcrypt.hash(data.password_hash, 10);

    // Inicializar valores por defecto
    data.post_count = 0;
    
    return this.userRepository.createUser(data);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    // Verificar si el usuario existe
    const existingUser = await this.findOne(id);

    // Si se intenta actualizar el username, verificar que no exista
    if (data.username && data.username !== existingUser.username) {
      const userByUsername = await this.userRepository.findByUsername(data.username);
      if (userByUsername) {
        throw new BadRequestException('Username is already taken');
      }
    }

    // Si se intenta actualizar el email, verificar que no exista
    if (data.email && data.email !== existingUser.email) {
      const userByEmail = await this.userRepository.findByEmail(data.email);
      if (userByEmail) {
        throw new BadRequestException('Email is already taken');
      }
    }

    // Si se actualiza el rol, verificar que existe
    if (data.roleId) {
      await this.rolesService.findOne(data.roleId);
    }

    // Si se actualiza el password, hashearlo
    if (data.password_hash) {
      data.password_hash = await bcrypt.hash(data.password_hash, 10);
    }

    const user = await this.userRepository.updateUser(id, data);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    
    // Opcional: Verificar si el usuario tiene posts u otras relaciones antes de eliminar
    
    const deleted = await this.userRepository.deleteUser(id);
    if (!deleted) {
      throw new NotFoundException('User not found');
    }
  }

  async updatePostCount(id: number, increment: boolean = true): Promise<User> {
    const user = await this.findOne(id);
    const updatedCount = increment ? user.post_count + 1 : Math.max(0, user.post_count - 1);
    
    return this.userRepository.updateUser(id, {
      post_count: updatedCount,
    });
  }

  async updateAvatar(id: number, avatarUrl: string): Promise<User> {
    const user = await this.findOne(id);
    return this.userRepository.updateUser(id, {
      avatar_url: avatarUrl,
    });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password_hash);
  }
}