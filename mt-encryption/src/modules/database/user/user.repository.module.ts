import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantContextProvider } from 'src/context/tenant-context.provider';
import { EncryptionRepositoryModule } from 'src/modules/encryption/encryption.repository.module';
import { UserRepositoryDef } from 'src/repository/user.repository.def';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EncryptionRepositoryModule],
  providers: [{ provide: UserRepositoryDef, useClass: UserRepository }, TenantContextProvider],
  exports: [UserRepositoryDef],
})
export class UsersRepositoryModule {}
