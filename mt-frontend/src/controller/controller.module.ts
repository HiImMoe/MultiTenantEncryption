import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { BoniController } from './boni.controller';
import { EmployeeController } from './employee.controller';
import { MissingDaysController } from './missing-days.controller';
import { PerformanceRatingController } from './perframce-rating.controller';

@Module({
  imports: [ServiceModule],
  controllers: [
    EmployeeController,
    BoniController,
    PerformanceRatingController,
    MissingDaysController,
  ],
})
export class ControllerModule {}
