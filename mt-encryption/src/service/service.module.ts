import { Module } from '@nestjs/common';
import { TenantContextProvider } from 'src/context/tenant-context.provider';
import { DatabaseModule } from 'src/modules/database/database.module';
import { EncryptionRepositoryModule } from 'src/modules/encryption/encryption.repository.module';
import { UserService } from './user/user.service';

@Module({
  imports: [DatabaseModule, EncryptionRepositoryModule],
  providers: [UserService, TenantContextProvider],
  exports: [UserService],
})
export class ServiceModule {}
