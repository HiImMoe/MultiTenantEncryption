import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeNumber: string;

  @Column()
  gender: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  jobTitle: string;

  @Column()
  ssn: string;

  @Column()
  iban: string;
}
