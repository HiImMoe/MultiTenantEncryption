import { PagingDTO } from 'src/dto/common';
import { EmployeeDTO, GetEmployeeReqDTO } from 'src/dto/employee.dto';

export type SearchEmployeeModel = Omit<GetEmployeeReqDTO, keyof PagingDTO>;

export class EmployeeModel extends EmployeeDTO {}
