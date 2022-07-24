import { Body, Controller, Post } from '@nestjs/common';
import { CreateTenantDTO, TenantDTO } from 'src/dto/tenant.dto';
import { TenantService } from 'src/service/tenant/tenant.service';

@Controller('/tenant')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Post()
  async createTenant(@Body() newTenant: CreateTenantDTO): Promise<TenantDTO> {
    return this.tenantService.createTenant(newTenant);
  }
}
