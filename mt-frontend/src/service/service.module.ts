import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { EmployeeService } from './employee.service';

@Module({
  imports: [HttpModule],
  providers: [EmployeeService, ApiService],
  exports: [EmployeeService],
})
export class ServiceModule {}
