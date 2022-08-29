import { Request } from 'express';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreatePerformanceRatingDTO } from 'src/api/dto/create-performance-rating-dto';
import { PerformanceRatingService } from 'src/service/performance-rating.service';

@Controller('/performance-rating')
export class PerformanceRatingController {
  constructor(private performanceRatingService: PerformanceRatingService) {}

  @Post()
  async createPerformanceRating(
    @Req() req: Request,
    @Body() performanceRatingData: CreatePerformanceRatingDTO,
  ) {
    const data = await this.performanceRatingService.createPerformanceRating(
      req.headers.authorization,
      performanceRatingData,
    );
    return data;
  }
}
