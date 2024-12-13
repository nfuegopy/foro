/*eslint-disable prettier/prettier  */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RangosController } from './controllers/rangos.controller';
import { RangosService } from './services/rangos.service';
import { Rangos } from './entities/rangos.entity';
import { RangoRepository } from './repositories/rangos.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Rangos])],
  controllers: [RangosController],
  providers: [RangosService, RangoRepository],
  exports: [RangosService],
})
export class RangosModule {}