import { Injectable } from '@nestjs/common';
import { CreatePerformanceRatingDTO } from 'src/dto/performance-rating.dto';
import { PerformanceRatingRepositoryDef } from 'src/repository/performance-reating.repository.def';

@Injectable()
export class PerformanceRatingService {
  constructor(private performanceRatingRepo: PerformanceRatingRepositoryDef) {}

  async createPerformanceRating(data: CreatePerformanceRatingDTO) {
    return await this.performanceRatingRepo.createPerformanceRating(data);
  }
}
