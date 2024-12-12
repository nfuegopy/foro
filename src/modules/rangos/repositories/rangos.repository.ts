/*eslint-disable prettier/prettier  */

import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rangos } from '../entities/rangos.entity';
@Injectable()
export class RangoRepository{
    constructor(
        @InjectRepository(Rangos)
        private readonly rangoRepo: Repository<Rangos>,
    ) {}

    async createRango(data: Partial<Rangos>): Promise<Rangos>{
        const rango = this.rangoRepo.create(data);
        return this.rangoRepo.save(rango);
    }

    async findAll(): Promise<Rangos[]>{
        return this.rangoRepo.find();
    }

    async findOne(id: number): Promise<Rangos>{
        return this.rangoRepo.findOne({where:{id}});
    }

    async findByName(rank_name: string): Promise<Rangos>{
        return this.rangoRepo.findOne({where:{rank_name}});
    }

async updateRango(id:number, data: Partial<Rangos>): Promise<Rangos>{
    const rango = await this.findOne(id);
    if(!rango) return null;
    Object.assign(rango, data);
    return this.rangoRepo.save(rango);
}

async deleteRango(id:number): Promise<boolean>{
    const result = await this.rangoRepo.delete(id);
    return result.affected>0;
}
}