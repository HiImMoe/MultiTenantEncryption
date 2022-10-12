import { Request } from 'express';
import { Controller, Get, Req } from '@nestjs/common';
import { TenantService } from 'src/service/tenant.service';

@Controller('/tenant')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Get('/tenantId')
  async getTenantId(@Req() req: Request): Promise<string> {
    return await this.tenantService.getTenantId(req.headers.authorization);
  }
}
