import { UseGuards, Controller, Post, Body } from '@nestjs/common';
import { ApiOAuth2, ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreatePerformanceRatingDTO } from 'src/dto/performance-rating.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { PerformanceRatingService } from 'src/service/performance-rating/performance-rating.service';
import { ApiValidationErrorResponse } from 'src/validation';

@ApiOAuth2([])
@ApiTags('PerformanceRating')
@UseGuards(JwtAuthGuard)
@Controller('/:tenantId/performance-rating')
export class PerformanceRatingController {
  constructor(private performanceRatingService: PerformanceRatingService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'id of the new performance rating entry',
    type: String,
  })
  @ApiValidationErrorResponse()
  @ApiOperation({ summary: 'creates a new performance rating entry' })
  async createMissingDay(@Body() performanceRating: CreatePerformanceRatingDTO) {
    return await this.performanceRatingService.createPerformanceRating(performanceRating);
  }
}
