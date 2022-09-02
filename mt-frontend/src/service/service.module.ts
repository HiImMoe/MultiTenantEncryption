import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { BoniService } from './boni.service';
import { EmployeeService } from './employee.service';
import { EncryptionService } from './encryption.service';
import { HashService } from './hash.service';
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
    HashService,
  ],
  exports: [
    EmployeeService,
    BoniService,
    PerformanceRatingService,
    MissingDaysService,
    KeyService,
    HashService,
  ],
})
export class ServiceModule {}
