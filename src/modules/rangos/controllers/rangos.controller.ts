/*eslint-disable prettier/prettier  */

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
  import { RangosService } from '../services/rangos.service';
  import { Rangos } from '../entities/rangos.entity';
  
  @Controller('rangos')
  export class RangosController {
    constructor(private readonly rangosService: RangosService) {}
  
    @Post()
    create(@Body() data: Partial<Rangos>): Promise<Rangos> {
      return this.rangosService.create(data);
    }
  
    @Get()
    findAll(): Promise<Rangos[]> {
      return this.rangosService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Rangos> {
      return this.rangosService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() data: Partial<Rangos>,
    ): Promise<Rangos> {
      return this.rangosService.update(id, data);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.rangosService.remove(id);
    }
  }