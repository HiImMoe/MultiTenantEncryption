import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
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

  @ApiProperty({ required: false, example: 'Linzi' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false, example: 'China' })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ required: false, example: 'ajohniganh@drupal.org' })
  @IsString()
  @IsOptional()
  email?: string;

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
  @IsString()
  @IsOptional()
  employeeNumber?: string;

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
