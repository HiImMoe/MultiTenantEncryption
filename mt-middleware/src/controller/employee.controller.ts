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

@Controller('/employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async getEmployees(
    @Req() req: Request,
    @Query() { page, pageSize, ...getParams }: GetEmployeeReqDTO,
  ): Promise<any> {
    return await this.employeeService.getEmployee(
      req.headers.authorization,
      getParams,
      { page, pageSize },
    );
  }

  @Post()
  async createEmployee(
    @Req() req: Request,
    @Body() employeeData: CreateEmployeeDTO,
  ): Promise<any> {
    return await this.employeeService.createEmployee(
      req.headers.authorization,
      employeeData,
    );
  }

  @Patch('/:employeeId')
  async updateEmployee(
    @Req() req: Request,
    @Param('employeeId', ParseUUIDPipe) employeeId: string,
    @Body() employeeData: UpdateEmployeeDTO,
  ) {
    return this.employeeService.updateEmployee(
      req.headers.authorization,
      employeeId,
      employeeData,
    );
  }
}
