import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ServiceModule } from 'src/service/service.module';
import { TenantController } from './tenant/tenant.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [ServiceModule, AuthModule, PassportModule],
  controllers: [UserController, TenantController],
})
export class ControllerModule {}
