import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { BoniDTO } from './boni.dto';
import { PagingDTO } from './common';
import { MissingDaysDTO } from './missing-days.dto';
import { PerformanceRatingDTO } from './performance-rating.dto';

export class GetEmployeeReqDTO extends PagingDTO {
  @ApiProperty({ required: false, example: '1' })
  @IsOptional()
  employeeNumber?: string;

  @ApiProperty({ required: false, example: 'M' })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ required: false, example: 'Harris' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ required: false, example: 'Baddoe' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ required: false, example: 'Administrative Officer' })
  @IsString()
  @IsOptional()
  jobTitle?: string;
}

export class EmployeeDTO {
  @IsUUID()
  id!: string;

  @IsString()
  employeeNumber!: string;

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

export class EmployeeDetailDTO extends EmployeeDTO {
  @IsObject()
  boni!: BoniDTO[];

  @IsObject()
  missingDays!: MissingDaysDTO[];

  @IsObject()
  performanceRatings!: PerformanceRatingDTO[];
}

export class CreateEmployeeDTO {
  @IsString()
  employeeNumber!: string;

  @IsArray()
  employeeNumber_bi!: string[];

  @IsString()
  gender!: string;

  @IsArray()
  gender_bi!: string[];

  @IsString()
  firstName!: string;

  @IsArray()
  firstName_bi!: string[];

  @IsString()
  lastName!: string;

  @IsArray()
  lastName_bi!: string[];

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

  @IsArray()
  jobTitle_bi!: string[];

  @IsString()
  ssn!: string;

  @IsString()
  iban!: string;
}

export class UpdateEmployeeDTO {
  @IsString()
  @IsOptional()
  employeeNumber?: string;

  @IsArray()
  @IsOptional()
  employeeNumber_bi?: string[];

  @IsString()
  @IsOptional()
  gender?: string;

  @IsArray()
  @IsOptional()
  gender_bi?: string[];

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsArray()
  @IsOptional()
  firstName_bi?: string[];

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsArray()
  @IsOptional()
  lastName_bi?: string[];

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

  @IsArray()
  @IsOptional()
  jobTitle_bi?: string[];

  @IsString()
  @IsOptional()
  ssn?: string;

  @IsString()
  @IsOptional()
  iban?: string;
}
