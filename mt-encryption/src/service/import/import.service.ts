import { Injectable } from '@nestjs/common';
import { TenantRequestContext, RequestContext } from 'src/context/tenant-context';
import { EmployeeService } from '../employee/employee.serivce';
import { TenantService } from '../tenant/tenant.service';
import * as fs from 'fs';
import { CreateTenantDTO } from 'src/dto/tenant.dto';
import { calcTenantSize } from './utils';
import { CreateEmployeeDTO } from 'src/dto/employee.dto';
import { PerformanceRatingService } from '../performance-rating/performance-rating.service';
import { CreatePerformanceRatingDTO } from 'src/dto/performance-rating.dto';
import { CreateBoniDTO } from 'src/dto/boni.dto';
import { BoniService } from '../boni/boni.service';
import { CreateMissingDayDTO } from 'src/dto/missing-days.dto';
import { MissingDayService } from '../missing-day/missing-day.service';
import { Connection } from 'typeorm';

const NUMBER_OF_TENANTS = 10;
const MAX_EMPLOYEE_SIZE = 100;

@Injectable()
export class ImportService {
  constructor(
    private tenantService: TenantService,
    private employeeService: EmployeeService,
    private performanceRatingService: PerformanceRatingService,
    private boniService: BoniService,
    private missingDayService: MissingDayService,
  ) {}

  async importData() {
    const tenantList: CreateTenantDTO[] = this.importFileData('tenant.json');

    for (let i = 0; i < NUMBER_OF_TENANTS; i++) {
      await this.importTenant(10, tenantList[i]);
    }
  }

  async importTenant(tenantNumber, tenantData: CreateTenantDTO) {
    const tenant = await this.tenantService.createTenant(tenantData);
    const ctx: TenantRequestContext = RequestContext.get();
    if (ctx) {
      ctx.tenantId = tenant.id;
    }

    const employeeList: CreateEmployeeDTO[] = this.importFileData('employee.json');
    for (let i = 0; i < calcTenantSize(tenantNumber, NUMBER_OF_TENANTS, MAX_EMPLOYEE_SIZE); i++) {
      const employeeId = await this.employeeService.createEmployee({ ...employeeList[i], employeeNumber: i });
      console.log('create Performance Ratings');
      await this.createPerformanceRatings(employeeId, 10);
      console.log('Create Boni');
      await this.createBoni(employeeId, 10);
      console.log('Create Missing Days');
      await this.createMissingDays(employeeId, 10);
      console.log('Finished');
    }
  }

  async createPerformanceRatings(employeeId: string, numberOfRatings: number) {
    const performanceRatings: CreatePerformanceRatingDTO[] = this.importFileData('performance-rating.json');
    for (let i = 0; i < numberOfRatings; i++) {
      await this.performanceRatingService.createPerformanceRating({ ...performanceRatings[i], employeeId: employeeId });
    }
  }

  async createBoni(employeeId: string, numberOfBoni: number) {
    const boni: CreateBoniDTO[] = this.importFileData('boni.json');
    for (let i = 0; i < numberOfBoni; i++) {
      await this.boniService.createBoni({ ...boni[i], employeeId });
    }
  }

  async createMissingDays(employeeId: string, numberOfMissingDays) {
    const missingDays: CreateMissingDayDTO[] = this.importFileData('missing-days.json');
    for (let i = 0; i < numberOfMissingDays; i++) {
      await this.missingDayService.createMissingDay({ ...missingDays[i], employeeId });
    }
  }

  importFileData(fileName) {
    try {
      const data = fs.readFileSync(`importData/${fileName}`, 'utf8');
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  }
}
