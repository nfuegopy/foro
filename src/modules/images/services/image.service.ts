/* eslint-disable prettier/prettier */
import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { ImageRepository } from '../repositories/image.repository';
import { Image } from '../entities/image.entity';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class ImageService {
    constructor(
        private readonly imageRepository: ImageRepository,
        private readonly usersService: UsersService, // Para verificar que el usuario existe
    ) {}

    async create(data: Partial<Image>): Promise<Image> {
        if (!data.url || data.url.trim() === '') {
            throw new BadRequestException('URL is required');
        }

        if (!data.uploaded_by) {
            throw new BadRequestException('Uploader ID is required');
        }

        // Verificar que el usuario existe
        await this.usersService.findOne(data.uploaded_by);

        // Verificar si la URL ya existe
        const existing = await this.imageRepository.findByUrl(data.url);
        if (existing) {
            throw new BadRequestException('Image URL already exists');
        }

        return this.imageRepository.createImage(data);
    }

    async findAll(): Promise<Image[]> {
        return this.imageRepository.findAll();
    }

    async findOne(id: number): Promise<Image> {
        const image = await this.imageRepository.findOne(id);
        if (!image) {
            throw new NotFoundException('Image not found');
        }
        return image;
    }

    async update(id: number, data: Partial<Image>): Promise<Image> {
        if (data.url && data.url.trim() === '') {
            throw new BadRequestException('URL cannot be empty');
        }

        if (data.url) {
            const existing = await this.imageRepository.findByUrl(data.url);
            if (existing && existing.id !== id) {
                throw new BadRequestException('Image URL already exists');
            }
        }

        if (data.uploaded_by) {
            await this.usersService.findOne(data.uploaded_by);
        }

        const image = await this.imageRepository.updateImage(id, data);
        if (!image) {
            throw new NotFoundException('Image not found');
        }
        return image;
    }

    async remove(id: number): Promise<void> {
        const deleted = await this.imageRepository.deleteImage(id);
        if (!deleted) {
            throw new NotFoundException('Image not found');
        }
    }
}