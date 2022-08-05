import { Body, Controller, Post } from '@nestjs/common';
import { CreateTenantDTO, TenantDTO } from 'src/dto/tenant.dto';
import { TenantService } from 'src/service/tenant/tenant.service';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';

@Controller('/tenant')
@ApiTags('tenant')
@ApiOAuth2([])
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Post()
  async createTenant(@Body() newTenant: CreateTenantDTO): Promise<TenantDTO> {
    return this.tenantService.createTenant(newTenant);
  }
}
