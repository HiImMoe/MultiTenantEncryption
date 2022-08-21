import { CreateEmployeeDTO, UpdateEmployeeDTO } from 'src/dto/employee.dto';
import { Employee } from 'src/modules/database/employee/employee.entity';
import { EmployeeModel } from 'src/modules/database/models/employee.model';
import { FindOptionsWhere } from 'typeorm';

export abstract class EmployeeRepositoryDef {
  abstract createEmployee(employeeData: CreateEmployeeDTO): Promise<string>;
  abstract getEmployee(where: FindOptionsWhere<Employee>): Promise<EmployeeModel[]>;
  abstract updateEmployee(id: string, employeeData: UpdateEmployeeDTO): Promise<void>;
}
