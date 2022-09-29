import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantRepositoryDef } from 'src/repository/tenant.repository.def';
import { Tenant } from './tenant.entity';
import { TenantRepository } from './tenant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [{ provide: TenantRepositoryDef, useClass: TenantRepository }],
  exports: [TenantRepositoryDef],
})
export class TenantRepositoryModule {}
