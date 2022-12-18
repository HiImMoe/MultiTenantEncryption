import { IsString, IsUUID } from 'class-validator';

export class MissingDaysDTO {
  @IsUUID()
  id!: string;

  @IsUUID()
  employeeId!: string;

  @IsString()
  date!: string;

  @IsString()
  reason!: string;
}

export class CreateMissingDayDTO {
  @IsUUID()
  employeeId!: string;

  @IsString()
  date!: string;

  @IsString()
  reason!: string;
}
