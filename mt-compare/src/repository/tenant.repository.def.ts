import { TenantDTO } from 'src/dto/tenant.dto';

export abstract class TenantRepositoryDef {
  abstract createTenant(tenantData: any): Promise<TenantDTO>;
  abstract getTenantById(tenantId: string): Promise<TenantDTO>;
}
