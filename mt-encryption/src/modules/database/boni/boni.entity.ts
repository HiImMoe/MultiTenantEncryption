import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Employee } from '../employee/employee.entity';

@Entity()
export class Boni extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employee)
  employee: Employee;

  @Column('uuid')
  employeeId: string;

  @Column()
  date: string;

  @Column()
  amount: string;

  @Column()
  boniReason: string;
}
