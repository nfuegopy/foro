/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Image } from '../entities/image.entity';

@Injectable()
export class ImageRepository {
    constructor(
        @InjectRepository(Image)
        private readonly imagenRepo: Repository<Image>,
    ) {}

    async createImage(data: Partial<Image>): Promise<Image> {
        const image = this.imagenRepo.create(data);
        return this.imagenRepo.save(image);
    }

    async findAll(): Promise<Image[]> {
        return this.imagenRepo.find();
    }

    async findOne(id: number): Promise<Image> {
        return this.imagenRepo.findOne({ where: { id } });
    }

    async findByUrl(url: string): Promise<Image> {
        return this.imagenRepo.findOne({ where: { url } });
    }

    async updateImage(id: number, data: Partial<Image>): Promise<Image> {
        const image = await this.findOne(id);
        if (!image) return null;
        Object.assign(image, data);
        return this.imagenRepo.save(image);
    }

    async deleteImage(id: number): Promise<boolean> {
        const result = await this.imagenRepo.delete(id);
        return result.affected > 0;
    }
}