import { IsNumber, IsString, IsUUID } from 'class-validator';
export class BoniDTO {
  @IsUUID()
  id!: string;

  @IsUUID()
  employeeId!: string;

  @IsString()
  date!: string;

  @IsNumber()
  amount!: number;

  @IsString()
  boniReason!: string;
}

export class CreateBoniDTO {
  @IsUUID()
  employeeId!: string;

  @IsString()
  date!: string;

  @IsNumber()
  amount!: string;

  @IsString()
  boniReason!: string;
}
