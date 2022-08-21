import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class EmployeeDTO {
  @IsUUID()
  id!: string;

  @IsNumber()
  employeeNumber!: number;

  @IsString()
  gender!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  street!: string;

  @IsString()
  city!: string;

  @IsString()
  country!: string;

  @IsString()
  email!: string;

  @IsString()
  phone!: string;

  @IsString()
  jobTitle!: string;

  @IsString()
  ssn!: string;

  @IsString()
  iban!: string;
}

export class CreateEmployeeDTO {
  @IsNumber()
  employeeNumber!: number;

  @IsString()
  gender!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  street!: string;

  @IsString()
  city!: string;

  @IsString()
  country!: string;

  @IsString()
  email!: string;

  @IsString()
  phone!: string;

  @IsString()
  jobTitle!: string;

  @IsString()
  ssn!: string;

  @IsString()
  iban!: string;
}

export class UpdateEmployeeDTO {
  @IsNumber()
  @IsOptional()
  employeeNumber?: number;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  jobTitle?: string;

  @IsString()
  @IsOptional()
  ssn?: string;

  @IsString()
  @IsOptional()
  iban?: string;
}
