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

  async getEmployee(params: SearchEmployeeModel, paging: PagingDTO): Promise<EmployeeModel[]> {
    const builder = this.employeeRepo.createQueryBuilder('employee').orderBy('employee.employeeNumber');

    if (params.firstName) {
      builder.andWhere({ firstName: params.firstName });
    }

    if (params.lastName) {
      builder.andWhere({ lastName: params.lastName });
    }

    if (params.employeeNumber) {
      builder.andWhere({ employeeNumber: params.employeeNumber });
    }

    if (params.email) {
      builder.andWhere({ email: params.email });
    }

    if (params.gender) {
      builder.andWhere({ gender: params.gender });
    }

    if (params.city) {
      builder.andWhere({ city: params.city });
    }

    if (params.country) {
      builder.andWhere({ country: params.country });
    }

    if (params.jobTitle) {
      builder.andWhere({ jobTitle: params.jobTitle });
    }

    const res = await this.common.get(builder, paging);
    return res.results;
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
