import { Request } from 'express';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateMissingDayDTO } from 'src/api/dto/create-missing-day-dto';
import { MissingDaysService } from 'src/service/missing-days.service';

@Controller('/:tenantId/missing-days')
export class MissingDaysController {
  constructor(private missingDaysService: MissingDaysService) {}

  @Post()
  async createMissingDay(
    @Req() req: Request,
    @Body() missingDayData: CreateMissingDayDTO,
  ) {
    const data = await this.missingDaysService.createMissingDay(
      req.headers.authorization,
      missingDayData,
    );
    return data;
  }
}
