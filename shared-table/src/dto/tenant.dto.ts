import { IsString, IsUUID } from 'class-validator';

export class TenantDTO {
  @IsUUID()
  id: string;

  @IsString()
  tenantName!: string;
}
export class CreateTenantDTO {
  @IsString()
  tenantName!: string;
}
