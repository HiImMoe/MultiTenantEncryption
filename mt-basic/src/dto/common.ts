import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PagingDTO {
  @ApiProperty({ required: false })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  pageSize?: number;
}
