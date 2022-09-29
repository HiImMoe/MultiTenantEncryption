import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissingDayRepositoryDef } from 'src/repository/missing-day.repository.def';
import { MissingDay } from './missing-day.entity';
import { MissingDayRepository } from './missing-day.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MissingDay])],
  providers: [{ provide: MissingDayRepositoryDef, useClass: MissingDayRepository }],
  exports: [MissingDayRepositoryDef],
})
export class MissingDayRepositoryModule {}
