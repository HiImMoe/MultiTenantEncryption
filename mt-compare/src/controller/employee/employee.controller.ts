import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOAuth2, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDTO, EmployeeDetailDTO, EmployeeDTO, GetEmployeeReqDTO, UpdateEmployeeDTO } from 'src/dto/employee.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { EmployeeService } from 'src/service/employee/employee.serivce';
import { ApiValidationErrorResponse } from 'src/validation';

@ApiOAuth2([])
@ApiTags('employee')
@UseGuards(JwtAuthGuard)
@Controller('/:tenantId/employee')
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

  @Get('/:employeeId')
  @ApiOkResponse({
    description: 'get employee with all information',
  })
  @ApiValidationErrorResponse()
  @ApiOperation({ summary: 'get employee with details' })
  async getEmployeeDetails(@Param('employeeId', ParseUUIDPipe) employeeId: string): Promise<EmployeeDetailDTO> {
    const employee = await this.employeeService.getEmployeeDetails(employeeId);
    return employee;
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

  @Patch('/:employeeId')
  @ApiParam({ name: 'employeeId' })
  @ApiOperation({ summary: 'Update employee' })
  async updateEmployee(@Param('employeeId', ParseUUIDPipe) employeeId: string, @Body() employeeData: UpdateEmployeeDTO) {
    return await this.employeeService.updateEmployee(employeeId, employeeData);
  }
}
