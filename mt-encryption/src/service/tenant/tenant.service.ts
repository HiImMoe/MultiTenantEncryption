import { Injectable } from '@nestjs/common';
import { CreateTenantDTO, TenantDTO } from 'src/dto/tenant.dto';
import { TenantRepositoryDef } from 'src/repository/tenant.repository.def';

@Injectable()
export class TenantService {
  constructor(private tenantRepo: TenantRepositoryDef) {}

  async createTenant(newTenant: CreateTenantDTO): Promise<TenantDTO> {
    const tenant = await this.tenantRepo.createTenant(newTenant);
    return tenant;
  }

  async getTenant(tenantId: string): Promise<TenantDTO> {
    return await this.tenantRepo.getTenantById(tenantId);
  }
}
