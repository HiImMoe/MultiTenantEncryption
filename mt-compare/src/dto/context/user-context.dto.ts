import { IsUUID } from 'class-validator';

export class UserContextDTO {
  @IsUUID()
  userId!: string;
}
