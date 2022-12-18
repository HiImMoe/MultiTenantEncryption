import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:tenantId')
  getTenantKeys(@Param('tenantId', ParseUUIDPipe) tenantId: string): {
    keyEnc: string;
    keyHash: string;
  } {
    return this.appService.getTenant(tenantId);
  }
}
