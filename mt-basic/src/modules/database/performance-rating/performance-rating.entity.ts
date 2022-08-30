import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Employee } from '../employee/employee.entity';

@Entity()
export class PerformanceRating extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employee)
  employee: Employee;

  @Column('uuid')
  employeeId: string;

  @Column()
  date: string;

  @Column()
  notes: string;
}
