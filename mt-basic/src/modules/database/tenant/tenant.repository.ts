import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTenantDTO, TenantDTO } from 'src/dto/tenant.dto';
import { TenantRepositoryDef } from 'src/repository/tenant.repository.def';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantRepository extends TenantRepositoryDef {
  constructor(@InjectRepository(Tenant) private tenantRepo: Repository<Tenant>) {
    super();
  }

  map(tenant: Tenant): TenantDTO {
    return {
      id: tenant.id,
      tenantName: tenant.tenantName,
    };
  }

  async createTenant(tenantData: CreateTenantDTO): Promise<TenantDTO> {
    const tenant = await this.tenantRepo.create(tenantData);
    const newTenant = await this.tenantRepo.save(tenant);
    return this.map(newTenant);
  }

  async getTenantById(tenantId: string): Promise<TenantDTO> {
    const tenant = await this.tenantRepo.findOneBy({ id: tenantId });
    return this.map(tenant);
  }
}