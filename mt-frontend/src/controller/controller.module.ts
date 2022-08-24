import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [ServiceModule],
  controllers: [EmployeeController],
})
export class ControllerModule {}
