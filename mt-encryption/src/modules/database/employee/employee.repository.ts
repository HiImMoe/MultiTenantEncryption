import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from 'src/dto/employee.dto';
import { EmployeeRepositoryDef } from 'src/repository/employee.repository.def';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CommonDB } from '../common';
import { EmployeeModel } from '../models/employee.model';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeRepository extends EmployeeRepositoryDef {
  private readonly common: CommonDB<Employee>;
  constructor(@InjectRepository(Employee) private employeeRepo: Repository<Employee>) {
    super();
    this.common = new CommonDB(Employee, employeeRepo);
  }

  async getEmployee(where: FindOptionsWhere<Employee>): Promise<EmployeeModel[]> {
    return await this.employeeRepo.find();
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
