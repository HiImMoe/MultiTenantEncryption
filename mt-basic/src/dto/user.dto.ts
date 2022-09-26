import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';
type encrypted = string;

export class UserDTO {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Max' })
  @IsString()
  firstName!: string;

  @ApiProperty({ example: 'Muster' })
  @IsString()
  lastName!: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive?: boolean;
}

export class CreateUserDTO {
  @ApiProperty()
  @IsUUID()
  keycloakId!: string;

  @ApiProperty({ example: 'Max', required: true })
  @IsString()
  firstName!: string;

  @ApiProperty({ example: 'Muster', required: true })
  @IsString()
  lastName!: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateUserWithTenant extends CreateUserDTO {
  tenantId: string;
}

export class UpdateUserDTO {
  @ApiProperty({ example: 'Maxi' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Master' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
