import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformanceRatingRepositoryDef } from 'src/repository/performance-reating.repository.def';
import { PerformanceRating } from './performance-rating.entity';
import { PerformanceRatingRepository } from './performance-rating.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PerformanceRating])],
  providers: [{ provide: PerformanceRatingRepositoryDef, useClass: PerformanceRatingRepository }],
  exports: [PerformanceRatingRepositoryDef],
})
export class PerformanceRatingRepositoryModule {}
