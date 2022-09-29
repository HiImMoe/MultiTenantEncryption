import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoniRepositoryDef } from 'src/repository/boni.repository.def';
import { Boni } from './boni.entity';
import { BoniRepository } from './boni.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Boni])],
  providers: [{ provide: BoniRepositoryDef, useClass: BoniRepository }],
  exports: [BoniRepositoryDef],
})
export class BoniRepositoryModule {}
