import { CreatePerformanceRatingDTO } from 'src/dto/performance-rating.dto';
import { PerformanceRatingModel } from 'src/modules/database/models/performance-rating.model';
import { PerformanceRating } from 'src/modules/database/performance-rating/performance-rating.entity';
import { FindOptionsWhere } from 'typeorm';

export abstract class PerformanceRatingRepositoryDef {
  abstract createPerformanceRating(data: CreatePerformanceRatingDTO): Promise<string>;
  abstract getPerformanceRating(where: FindOptionsWhere<PerformanceRating>): Promise<PerformanceRatingModel[]>;
}
