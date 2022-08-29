import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { BoniService } from './boni.service';
import { EmployeeService } from './employee.service';
import { EncryptionService } from './encryption.service';
import { KeyService } from './key.service';
import { MissingDaysService } from './missing-days.service';
import { PerformanceRatingService } from './performance-rating.service';

@Module({
  imports: [HttpModule],
  providers: [
    EmployeeService,
    ApiService,
    EncryptionService,
    BoniService,
    PerformanceRatingService,
    MissingDaysService,
    KeyService,
  ],
  exports: [
    EmployeeService,
    BoniService,
    PerformanceRatingService,
    MissingDaysService,
    KeyService,
  ],
})
export class ServiceModule {}
