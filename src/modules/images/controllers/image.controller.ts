/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { ImageService } from '../services/image.service';
import { Image } from '../entities/image.entity';

@Controller('images')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Post()
    create(@Body() data: Partial<Image>): Promise<Image> {
        return this.imageService.create(data);
    }

    @Get()
    findAll(): Promise<Image[]> {
        return this.imageService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Image> {
        return this.imageService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Partial<Image>,
    ): Promise<Image> {
        return this.imageService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.imageService.remove(id);
    }
}