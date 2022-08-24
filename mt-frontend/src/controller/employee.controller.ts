import { Request } from 'express';
import { Controller, Get, Req } from '@nestjs/common';
import { EmployeeService } from 'src/service/employee.service';

@Controller('/employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async getEmployees(@Req() req: Request): Promise<any> {
    return this.employeeService.getEmployee(req.headers.authorization);
  }
}
