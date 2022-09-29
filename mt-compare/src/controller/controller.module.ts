import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ServiceModule } from 'src/service/service.module';
import { BoniController } from './boni/boni.controller';
import { EmployeeController } from './employee/employee.controller';
import { ImportController } from './import/import.controller';
import { MissingDaysController } from './missing-days/missing-days.controller';
import { PerformanceRatingController } from './performance-rating/performance-rating.controller';
import { TenantController } from './tenant/tenant.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [ServiceModule, AuthModule, PassportModule],
  controllers: [
    UserController,
    TenantController,
    EmployeeController,
    ImportController,
    MissingDaysController,
    BoniController,
    PerformanceRatingController,
  ],
})
export class ControllerModule {}
