import { IsString, IsUUID } from 'class-validator';

export class PerformanceRatingDTO {
  @IsString()
  id!: string;

  @IsUUID()
  employeeId!: string;

  @IsString()
  date!: string;

  @IsString()
  notes!: string;
}

export class CreatePerformanceRatingDTO {
  @IsUUID()
  employeeId!: string;

  @IsString()
  date!: string;

  @IsString()
  notes!: string;
}
