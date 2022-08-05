import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from 'src/dto/employee.dto';
import { EmployeeRepositoryDef } from 'src/repository/employee.repository.def';
import { Repository } from 'typeorm';
import { EmployeeModel } from '../models/employee.model';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeRepository extends EmployeeRepositoryDef {
  constructor(@InjectRepository(Employee) private employeeRepo: Repository<Employee>) {
    super();
  }

  async getEmployee(): Promise<EmployeeModel[]> {
    return await this.employeeRepo.find();
  }

  async createEmployee(employeeData: CreateEmployeeDTO): Promise<EmployeeModel> {
    const employee = await this.employeeRepo.create(employeeData);
    this.employeeRepo.save(employee);
    return employee;
  }

  async updateEmployee(id: string, employeeData: UpdateEmployeeDTO): Promise<void> {
    await this.employeeRepo.update({ id: id }, employeeData);
    return;
  }
}
