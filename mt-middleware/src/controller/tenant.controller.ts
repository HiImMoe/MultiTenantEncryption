import { Request } from 'express';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TenantService } from 'src/service/tenant.service';
import { ApiOAuth2 } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiOAuth2([])
@Controller('/tenant')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Get('/tenantId')
  async getTenantId(@Req() req: Request): Promise<string> {
    return await this.tenantService.getTenantId(req.headers.authorization);
  }
}
