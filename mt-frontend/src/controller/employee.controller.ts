import { Request } from 'express';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { EmployeeService } from 'src/service/employee.service';
import { CreateEmployeeDTO } from 'src/api';
import { UpdateEmployeeDTO } from 'src/api/dto/update-employee-dto';

@Controller('/employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async getEmployees(@Req() req: Request): Promise<any> {
    return this.employeeService.getEmployee(req.headers.authorization);
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
