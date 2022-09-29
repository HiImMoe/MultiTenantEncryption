import { UseGuards, Controller, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiOAuth2, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMissingDayDTO } from 'src/dto/missing-days.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { MissingDayService } from 'src/service/missing-day/missing-day.service';
import { ApiValidationErrorResponse } from 'src/validation';

@ApiOAuth2([])
@ApiTags('MissingDays')
@UseGuards(JwtAuthGuard)
@Controller('/missing-days')
export class MissingDaysController {
  constructor(private missingDaysService: MissingDayService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'id of the new missing day entry',
    type: String,
  })
  @ApiValidationErrorResponse()
  @ApiOperation({ summary: 'creates a new missing day entry' })
  async createMissingDay(@Body() missingDay: CreateMissingDayDTO) {
    return await this.missingDaysService.createMissingDay(missingDay);
  }
}
