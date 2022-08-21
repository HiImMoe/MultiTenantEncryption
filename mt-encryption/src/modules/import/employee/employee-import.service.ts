import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/modules/database/employee/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeImportService {
  constructor(@InjectRepository(Employee) private employeeRepo: Repository<Employee>) {}
}
