import { HttpModule, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { EncryptionRepositoryModule } from 'src/modules/encryption/encryption.repository.module';
import { BoniService } from './boni/boni.service';
import { EmployeeService } from './employee/employee.serivce';
import { ImportService } from './import/import.service';
import { MissingDayService } from './missing-day/missing-day.service';
import { PerformanceRatingService } from './performance-rating/performance-rating.service';
import { TenantService } from './tenant/tenant.service';
import { UserService } from './user/user.service';

@Module({
  imports: [DatabaseModule, EncryptionRepositoryModule, HttpModule],
  providers: [UserService, TenantService, EmployeeService, PerformanceRatingService, BoniService, ImportService, MissingDayService],
  exports: [UserService, TenantService, EmployeeService, ImportService, BoniService, PerformanceRatingService, MissingDayService],
})
export class ServiceModule {}
