import { Injectable } from '@nestjs/common';
import { PagingDTO } from 'src/dto/common';
import { CreateEmployeeDTO, GetEmployeeReqDTO, UpdateEmployeeDTO } from 'src/dto/employee.dto';
import { EmployeeModel, SearchEmployeeModel } from 'src/modules/database/models/employee.model';
import { EmployeeRepositoryDef } from 'src/repository/employee.repository.def';

@Injectable()
export class EmployeeService {
  constructor(private employeeRepo: EmployeeRepositoryDef) {}

  async createEmployee(createEmployeeData: CreateEmployeeDTO): Promise<string> {
    const employee = await this.employeeRepo.createEmployee(createEmployeeData);
    return employee;
  }

  async updateEmployee(id: string, updateEmployeeData: UpdateEmployeeDTO): Promise<void> {
    return await this.employeeRepo.updateEmployee(id, updateEmployeeData);
  }

  async getEmployee(params: SearchEmployeeModel, paging: PagingDTO): Promise<EmployeeModel[]> {
    const employeeList = await this.employeeRepo.getEmployee(params, paging);
    return employeeList;
  }
}
