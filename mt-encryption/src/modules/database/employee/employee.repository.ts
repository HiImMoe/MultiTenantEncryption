import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagingDTO } from 'src/dto/common';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from 'src/dto/employee.dto';
import { EmployeeRepositoryDef } from 'src/repository/employee.repository.def';
import { Repository } from 'typeorm';
import { CommonDB } from '../common';
import { EmployeeModel, SearchEmployeeModel } from '../models/employee.model';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeRepository extends EmployeeRepositoryDef {
  private readonly common: CommonDB<Employee>;
  constructor(@InjectRepository(Employee) private employeeRepo: Repository<Employee>) {
    super();
    this.common = new CommonDB(Employee, employeeRepo);
  }

  mapEmployee(employeeEntity: Employee): EmployeeModel {
    return {
      id: employeeEntity.id,
      employeeNumber: employeeEntity.employeeNumber,
      gender: employeeEntity.gender,
      firstName: employeeEntity.firstName,
      lastName: employeeEntity.lastName,
      email: employeeEntity.email,
      phone: employeeEntity.phone,
      street: employeeEntity.street,
      city: employeeEntity.city,
      country: employeeEntity.country,
      iban: employeeEntity.iban,
      jobTitle: employeeEntity.jobTitle,
      ssn: employeeEntity.ssn,
    };
  }

  async getEmployee(params: SearchEmployeeModel, paging: PagingDTO): Promise<EmployeeModel[]> {
    const builder = this.employeeRepo.createQueryBuilder('employee');

    if (params.firstName) {
      builder.andWhere('employee.firstName_bi LIKE :firstName', { firstName: `%${params.firstName}%` });
    }

    if (params.lastName) {
      builder.andWhere('employee.lastName_bi LIKE :lastName', { lastName: `%${params.lastName}%` });
    }

    if (params.employeeNumber) {
      builder.andWhere('employee.employeeNumber_bi LIKE :employeeNumber', { employeeNumber: `%${params.employeeNumber}%` });
    }

    if (params.gender) {
      builder.andWhere('employee.gender_bi LIKE :gender', { gender: `%${params.gender}%` });
    }

    if (params.jobTitle) {
      builder.andWhere('employee.jobTitle_bi LIKE :jobTitle', { jobTitle: `%${params.jobTitle}%` });
    }

    const res = await this.common.get(builder, paging);
    return res.results.map(emp => this.mapEmployee(emp));
  }

  async getEmployeeById(id: string): Promise<EmployeeModel> {
    return await this.common.getById(id);
  }

  async createEmployee(employeeData: CreateEmployeeDTO): Promise<string> {
    const employee = this.common.create(employeeData);
    return employee;
  }

  async updateEmployee(id: string, employeeData: UpdateEmployeeDTO): Promise<void> {
    await this.common.update(id, employeeData);
    return;
  }
}
