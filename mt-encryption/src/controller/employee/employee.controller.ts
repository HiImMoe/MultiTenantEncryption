import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDTO } from 'src/dto/employee.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { EmployeeService } from 'src/service/employee/employee.serivce';

@ApiOAuth2([])
@ApiTags('employee')
@UseGuards(JwtAuthGuard)
@Controller('/employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async getEmployees(): Promise<any> {
    const employeeList = await this.employeeService.getEmployee();
    return employeeList;
  }

  @Post()
  async createEmployee(createEmployee: CreateEmployeeDTO): Promise<string> {
    const employee = await this.employeeService.createEmployee(createEmployee);
    return employee;
  }
}
