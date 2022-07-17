import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTenantDTO } from 'src/dto/tenant.dto';
import { TenantRepositoryDef } from 'src/repository/tenant.repository.def';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantRepository extends TenantRepositoryDef {
  constructor(@InjectRepository(Tenant) private tenantRepo: Repository<Tenant>) {
    super();
  }

  async createTenant(tenantData: CreateTenantDTO): Promise<Tenant> {
    const tenant = await this.tenantRepo.create(tenantData);
    // const newTenant = await this.tenantRepo.save(tenant);
    return tenant;
  }

  async getTenantById(tenantId: string): Promise<Tenant> {
    const tenant = await this.tenantRepo.findOneBy({ id: tenantId });
    return tenant;
  }
}
