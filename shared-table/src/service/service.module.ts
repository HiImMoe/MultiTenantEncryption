import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { EncryptionRepositoryModule } from 'src/modules/encryption/encryption.repository.module';
import { TenantService } from './tenant/tenant.service';
import { UserService } from './user/user.service';

@Module({
  imports: [DatabaseModule, EncryptionRepositoryModule],
  providers: [UserService, TenantService],
  exports: [UserService, TenantService],
})
export class ServiceModule {}
