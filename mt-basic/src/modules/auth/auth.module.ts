import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ServiceModule } from 'src/service/service.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [ServiceModule, ConfigModule, PassportModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
