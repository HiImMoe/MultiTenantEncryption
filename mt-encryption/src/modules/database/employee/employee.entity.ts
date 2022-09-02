import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeNumber: string;

  @Column('simple-array')
  employeeNumber_bi: string[];

  @Column()
  gender: string;

  @Column('simple-array')
  gender_bi: string[];

  @Column()
  firstName: string;

  @Column('simple-array')
  firstName_bi: string[];

  @Column()
  lastName: string;

  @Column('simple-array')
  lastName_bi: string[];

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

  @Column('simple-array')
  jobTitle_bi: string[];

  @Column()
  ssn: string;

  @Column()
  iban: string;
}
