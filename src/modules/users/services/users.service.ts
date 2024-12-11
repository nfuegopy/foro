import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

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

    // Hashear el password (opcional, asumiendo que password_hash ya viene hasheado
    // si no, podrías guardar en data.password_hash = await bcrypt.hash(data.password_hash, 10);
    data.password_hash = await bcrypt.hash(data.password_hash, 10);

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

  async update(id: number, data: Partial<User>): Promise<User> {
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
    const deleted = await this.userRepository.deleteUser(id);
    if (!deleted) {
      throw new NotFoundException('User not found');
    }
  }
}
