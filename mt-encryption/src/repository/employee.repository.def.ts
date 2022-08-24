import { PagingDTO } from 'src/dto/common';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from 'src/dto/employee.dto';
import { EmployeeModel, SearchEmployeeModel } from 'src/modules/database/models/employee.model';

export abstract class EmployeeRepositoryDef {
  abstract createEmployee(employeeData: CreateEmployeeDTO): Promise<string>;
  abstract getEmployee(params: SearchEmployeeModel, paging: PagingDTO): Promise<EmployeeModel[]>;
  abstract updateEmployee(id: string, employeeData: UpdateEmployeeDTO): Promise<void>;
}
