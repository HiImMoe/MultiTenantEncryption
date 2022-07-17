import { IsString, IsUUID } from 'class-validator';

export class CreateTenantDTO {
  @IsUUID()
  id: string;

  @IsString()
  tenantName!: string;

  @IsString()
  key!: string;
}
