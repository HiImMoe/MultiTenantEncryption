import { CreatePerformanceRatingDTO } from 'src/dto/performance-rating.dto';
import { PerformanceRatingModel } from 'src/modules/database/models/performance-rating.model';

export abstract class PerformanceRatingRepositoryDef {
  abstract createPerformanceRating(data: CreatePerformanceRatingDTO): Promise<string>;
  abstract getPerformanceRating(employeeId: string): Promise<PerformanceRatingModel[]>;
}
