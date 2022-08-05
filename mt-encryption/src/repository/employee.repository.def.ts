import { CreateEmployeeDTO, UpdateEmployeeDTO } from 'src/dto/employee.dto';
import { EmployeeModel } from 'src/modules/database/models/employee.model';

export abstract class EmployeeRepositoryDef {
  abstract createEmployee(employeeData: CreateEmployeeDTO): Promise<EmployeeModel>;
  abstract getEmployee(): Promise<EmployeeModel[]>;
  abstract updateEmployee(id: string, employeeData: UpdateEmployeeDTO): Promise<void>;
}
