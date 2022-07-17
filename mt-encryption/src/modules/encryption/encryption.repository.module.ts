import { Module } from '@nestjs/common';
import { EncryptionRepositoryDef } from 'src/repository/encryption.repository.def';
import { EncryptionRepository } from './encryption.repositiory';

@Module({
  providers: [{ provide: EncryptionRepositoryDef, useClass: EncryptionRepository }],
  exports: [EncryptionRepositoryDef],
})
export class EncryptionRepositoryModule {}
