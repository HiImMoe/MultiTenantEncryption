import { Column } from 'typeorm';

export class BaseEntity {
  @Column()
  tenantId: string;
}
