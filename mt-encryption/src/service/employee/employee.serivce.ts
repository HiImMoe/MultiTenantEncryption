import { Injectable } from '@nestjs/common';
import { PagingDTO } from 'src/dto/common';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from 'src/dto/employee.dto';
import { EmployeeModel, SearchEmployeeModel } from 'src/modules/database/models/employee.model';
import { EmployeeRepositoryDef } from 'src/repository/employee.repository.def';
import { BoniService } from '../boni/boni.service';
import { MissingDayService } from '../missing-day/missing-day.service';
import { PerformanceRatingService } from '../performance-rating/performance-rating.service';
import { mapDetailEmployee } from './emloyee.mapper';

@Injectable()
export class EmployeeService {
  constructor(
    private employeeRepo: EmployeeRepositoryDef,
    private missingDayService: MissingDayService,
    private boniService: BoniService,
    private performanceRatingService: PerformanceRatingService,
  ) {}

  async createEmployee(createEmployeeData: CreateEmployeeDTO): Promise<string> {
    const employee = await this.employeeRepo.createEmployee(createEmployeeData);
    return employee;
  }

  async updateEmployee(id: string, updateEmployeeData: UpdateEmployeeDTO): Promise<void> {
    return await this.employeeRepo.updateEmployee(id, updateEmployeeData);
  }

  async getEmployee(params: SearchEmployeeModel, paging: PagingDTO): Promise<EmployeeModel[]> {
    const employeeList = await this.employeeRepo.getEmployee(params, paging);
    return employeeList;
  }

  async getEmployeeDetails(id: string) {
    const employee = await this.employeeRepo.getEmployeeById(id);
    const missingDays = await this.missingDayService.getMissingDays(id);
    const boni = await this.boniService.getBoni(id);
    const pR = await this.performanceRatingService.getPerformanceRating(id);
    return mapDetailEmployee(employee, boni, pR, missingDays);
  }
}
