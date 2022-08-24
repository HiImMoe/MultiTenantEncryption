import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagingDTO } from 'src/dto/common';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from 'src/dto/employee.dto';
import { EmployeeRepositoryDef } from 'src/repository/employee.repository.def';
import { FindManyOptions, Repository } from 'typeorm';
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
    return await this.common.get({ ...params }, paging.page, paging.pageSize);
  }

  async createEmployee(employeeData: CreateEmployeeDTO): Promise<string> {
    const employee = this.common.create(employeeData);
    return employee;
  }

  async updateEmployee(id: string, employeeData: UpdateEmployeeDTO): Promise<void> {
    await this.employeeRepo.update({ id: id }, employeeData);
    return;
  }
}
