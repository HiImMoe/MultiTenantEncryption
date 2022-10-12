import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Tenant {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  tenantName: string;
}
