import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePerformanceRatingDTO } from 'src/dto/performance-rating.dto';
import { PerformanceRatingRepositoryDef } from 'src/repository/performance-reating.repository.def';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CommonDB } from '../common';
import { PerformanceRating } from './performance-rating.entity';

@Injectable()
export class PerformanceRatingRepository extends PerformanceRatingRepositoryDef {
  private readonly common: CommonDB<PerformanceRating>;
  constructor(@InjectRepository(PerformanceRating) private performanceRatingRepo: Repository<PerformanceRating>) {
    super();
    this.common = new CommonDB(PerformanceRating, performanceRatingRepo);
  }

  async createPerformanceRating(data: CreatePerformanceRatingDTO): Promise<string> {
    return await this.common.create(data);
  }

  async getPerformanceRating(employeeId: string): Promise<PerformanceRating[]> {
    const builder = this.performanceRatingRepo.createQueryBuilder('performanceRating').orderBy('id');
    builder.andWhere({ employeeId });
    const res = await this.common.get(builder);
    return res.results;
  }
}
