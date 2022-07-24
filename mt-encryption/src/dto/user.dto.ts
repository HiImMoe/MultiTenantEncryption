import { IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';
type encrypted = string;

export class UserDTO {
  @IsUUID()
  id: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsBoolean()
  isActive?: boolean;

  @IsString()
  secret?: encrypted;
}

export class CreateUserDTO {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  secret?: encrypted;
}

export class CreateUserWithTenant extends CreateUserDTO {
  tenantId: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
