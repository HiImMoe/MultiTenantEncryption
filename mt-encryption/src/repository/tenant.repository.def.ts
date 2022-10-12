import { ImportTenantDTO, TenantDTO } from 'src/dto/tenant.dto';

export abstract class TenantRepositoryDef {
  abstract createTenant(tenantData: any): Promise<TenantDTO>;
  abstract importTenant(tenantData: ImportTenantDTO): Promise<TenantDTO>;
  abstract getTenantById(tenantId: string): Promise<TenantDTO>;
}
