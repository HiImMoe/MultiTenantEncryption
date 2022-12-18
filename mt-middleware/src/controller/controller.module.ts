import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ServiceModule } from 'src/service/service.module';
import { BoniController } from './boni.controller';
import { EmployeeController } from './employee.controller';
import { MissingDaysController } from './missing-days.controller';
import { PerformanceRatingController } from './perframce-rating.controller';
import { TenantController } from './tenant.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [ServiceModule, AuthModule, PassportModule],
  controllers: [
    EmployeeController,
    BoniController,
    PerformanceRatingController,
    MissingDaysController,
    TenantController,
  ],
})
export class ControllerModule {}
