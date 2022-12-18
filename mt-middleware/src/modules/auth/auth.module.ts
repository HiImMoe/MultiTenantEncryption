import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ServiceModule } from 'src/service/service.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [ServiceModule, ConfigModule, PassportModule],
  providers: [JwtStrategy],
})
export class AuthModule {}
