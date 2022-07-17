import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ServiceModule } from 'src/service/service.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [ServiceModule, AuthModule, PassportModule],
  controllers: [UserController],
})
export class ControllerModule {}
