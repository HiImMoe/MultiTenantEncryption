import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepositoryDef } from 'src/repository/employee.repository.def';
import { Employee } from './employee.entity';
import { EmployeeRepository } from './employee.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [{ provide: EmployeeRepositoryDef, useClass: EmployeeRepository }],
  exports: [EmployeeRepositoryDef],
})
export class EmployeeRepositoryModule {}
