import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class EmployeeDTO {
  @IsUUID()
  id: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  taxCategory!: string;

  @IsNumber()
  salary!: number;

  @IsString()
  healthInsurance!: string;
}

export class CreateEmployeeDTO {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  taxCategory!: string;

  @IsNumber()
  salary!: number;

  @IsString()
  healthInsurance!: string;
}

export class UpdateEmployeeDTO {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  taxCategory?: string;

  @IsNumber()
  @IsOptional()
  salary?: number;

  @IsString()
  @IsOptional()
  healthInsurance?: string;
}
