import { Tenant } from 'src/modules/database/tenant/tenant.entity';

export abstract class TenantRepositoryDef {
  abstract createTenant(tenantData: any): Promise<Tenant>;
  abstract getTenantById(tenantId: string): Promise<Tenant>;
}
