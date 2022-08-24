import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from '../database/tenant/tenant.entity';
import { User } from '../database/user/user.entity';
import { ImportService } from './import.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tenant]), ConfigModule],
  providers: [ImportService],
  exports: [ImportService],
})
export class ImportModule {}