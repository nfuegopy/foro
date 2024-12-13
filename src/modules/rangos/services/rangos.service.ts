/*eslint-disable prettier/prettier  */

import {
    Injectable,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  import { RangoRepository } from '../repositories/rangos.repository';
  import { Rangos } from '../entities/rangos.entity';
  
  @Injectable()
  export class RangosService {
    constructor(private readonly rangoRepository: RangoRepository) {}
  
    async create(data: Partial<Rangos>): Promise<Rangos> {
      // Validaciones básicas
      if (!data.rank_name || data.rank_name.trim() === '') {
        throw new BadRequestException('Rank name is required');
      }
  
      if (data.min_posts === undefined || data.max_posts === undefined) {
        throw new BadRequestException('Min and max posts are required');
      }
  
      if (data.min_posts < 0 || data.max_posts < 0) {
        throw new BadRequestException('Post counts cannot be negative');
      }
  
      if (data.min_posts >= data.max_posts) {
        throw new BadRequestException('Max posts must be greater than min posts');
      }
  
      // Verificar si ya existe un rango con ese nombre
      const existing = await this.rangoRepository.findByName(data.rank_name);
      if (existing) {
        throw new BadRequestException('Rank name already exists');
      }
  
      // Verificar si hay solapamiento con otros rangos
      const allRangos = await this.rangoRepository.findAll();
      const overlap = allRangos.some(
        (rango) =>
          (data.min_posts >= rango.min_posts && data.min_posts <= rango.max_posts) ||
          (data.max_posts >= rango.min_posts && data.max_posts <= rango.max_posts),
      );
  
      if (overlap) {
        throw new BadRequestException('Post range overlaps with existing ranks');
      }
  
      return this.rangoRepository.createRango(data);
    }
  
    async findAll(): Promise<Rangos[]> {
      return this.rangoRepository.findAll();
    }
  
    async findOne(id: number): Promise<Rangos> {
      const rango = await this.rangoRepository.findOne(id);
      if (!rango) {
        throw new NotFoundException('Rank not found');
      }
      return rango;
    }
  
    async update(id: number, data: Partial<Rangos>): Promise<Rangos> {
      // Validar que el rango existe
      const existingRango = await this.rangoRepository.findOne(id);
      if (!existingRango) {
        throw new NotFoundException('Rank not found');
      }
  
      // Si se actualiza el nombre, verificar duplicados
      if (data.rank_name) {
        if (data.rank_name.trim() === '') {
          throw new BadRequestException('Rank name cannot be empty');
        }
        
        const nameExists = await this.rangoRepository.findByName(data.rank_name);
        if (nameExists && nameExists.id !== id) {
          throw new BadRequestException('Rank name already exists');
        }
      }
  
      // Si se actualizan los posts, validar rangos
      if (data.min_posts !== undefined || data.max_posts !== undefined) {
        const newMin = data.min_posts ?? existingRango.min_posts;
        const newMax = data.max_posts ?? existingRango.max_posts;
  
        if (newMin < 0 || newMax < 0) {
          throw new BadRequestException('Post counts cannot be negative');
        }
  
        if (newMin >= newMax) {
          throw new BadRequestException('Max posts must be greater than min posts');
        }
  
        // Verificar solapamiento con otros rangos
        const allRangos = await this.rangoRepository.findAll();
        const overlap = allRangos.some(
          (rango) =>
            rango.id !== id &&
            ((newMin >= rango.min_posts && newMin <= rango.max_posts) ||
              (newMax >= rango.min_posts && newMax <= rango.max_posts)),
        );
  
        if (overlap) {
          throw new BadRequestException('Post range overlaps with existing ranks');
        }
      }
  
      return this.rangoRepository.updateRango(id, data);
    }
  
    async remove(id: number): Promise<void> {
      const deleted = await this.rangoRepository.deleteRango(id);
      if (!deleted) {
        throw new NotFoundException('Rank not found');
      }
    }
  }