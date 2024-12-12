/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from './controllers/image.controller';
import { ImageService } from './services/image.service';
import { Image } from './entities/image.entity';
import { ImageRepository } from './repositories/image.repository';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Image]),
        UsersModule, // Necesario para verificar usuarios existentes
    ],
    controllers: [ImageController],
    providers: [ImageService, ImageRepository],
    exports: [ImageService],
})
export class ImageModule {}