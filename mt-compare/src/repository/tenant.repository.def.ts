import { CreateTenantDTO, ImportTenantDTO, TenantDTO } from 'src/dto/tenant.dto';

export abstract class TenantRepositoryDef {
  abstract createTenant(tenantData: CreateTenantDTO): Promise<TenantDTO>;
  abstract importTenant(tenantData: ImportTenantDTO): Promise<TenantDTO>;
  abstract getTenantById(tenantId: string): Promise<TenantDTO>;
}
