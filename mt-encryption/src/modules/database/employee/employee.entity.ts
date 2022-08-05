import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeNumber: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  taxCategory: string;

  @Column()
  salary: number;

  @Column()
  healthInsurance: string;
}
