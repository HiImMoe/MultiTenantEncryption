import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOAuth2, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDTO, EmployeeDTO, GetEmployeeReqDTO } from 'src/dto/employee.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { EmployeeService } from 'src/service/employee/employee.serivce';
import { ApiValidationErrorResponse } from 'src/validation';

@ApiOAuth2([])
@ApiTags('employee')
@UseGuards(JwtAuthGuard)
@Controller('/employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  @ApiOkResponse({
    description: 'list of employees',
  })
  @ApiValidationErrorResponse()
  @ApiOperation({ summary: 'lists the employees' })
  async getEmployees(@Query() { page, pageSize, ...getParams }: GetEmployeeReqDTO): Promise<EmployeeDTO[]> {
    const employeeList = await this.employeeService.getEmployee(getParams, { page, pageSize });
    return employeeList;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'id of the new employee',
    type: String,
  })
  @ApiValidationErrorResponse()
  @ApiOperation({ summary: 'creates a new employee' })
  async createEmployee(@Body() createEmployee: CreateEmployeeDTO): Promise<string> {
    const employee = await this.employeeService.createEmployee(createEmployee);
    return employee;
  }
}
