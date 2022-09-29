import { PagingDTO } from 'src/dto/common';
import { GetEmployeeReqDTO } from 'src/dto/employee.dto';

export type SearchEmployeeModel = Omit<GetEmployeeReqDTO, keyof PagingDTO>;
