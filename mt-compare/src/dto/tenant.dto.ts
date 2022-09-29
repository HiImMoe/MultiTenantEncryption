import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class TenantDTO {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'DemoTenant' })
  @IsString()
  tenantName!: string;
}
export class CreateTenantDTO {
  @ApiProperty({ example: 'DemoTenant' })
  @IsString()
  tenantName!: string;
}
