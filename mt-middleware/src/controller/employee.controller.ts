import { Request } from 'express';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { EmployeeService } from 'src/service/employee.service';
import { CreateEmployeeDTO } from 'src/api';
import { UpdateEmployeeDTO } from 'src/api/dto/update-employee-dto';
import { GetEmployeeReqDTO } from 'src/dto/employee.dto';

@Controller('/:tenantId/employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async getEmployees(
    @Req() req: Request,
    @Param('tenantId', ParseUUIDPipe) tenantId: string,
    @Query() { page, pageSize, ...getParams }: GetEmployeeReqDTO,
  ): Promise<any> {
    return await this.employeeService.getEmployee(
      req.headers.authorization,
      getParams,
      { page, pageSize },
      tenantId,
    );
  }

  @Post()
  async createEmployee(
    @Req() req: Request,
    @Param('tenantId', ParseUUIDPipe) tenantId: string,
    @Body() employeeData: CreateEmployeeDTO,
  ): Promise<any> {
    return await this.employeeService.createEmployee(
      req.headers.authorization,
      employeeData,
      tenantId,
    );
  }

  @Patch('/:employeeId')
  async updateEmployee(
    @Req() req: Request,
    @Param('tenantId', ParseUUIDPipe) tenantId: string,
    @Param('employeeId', ParseUUIDPipe) employeeId: string,
    @Body() employeeData: UpdateEmployeeDTO,
  ) {
    return this.employeeService.updateEmployee(
      req.headers.authorization,
      employeeId,
      employeeData,
      tenantId,
    );
  }
}
