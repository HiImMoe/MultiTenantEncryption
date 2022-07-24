import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/user.entity';
import { UsersRepositoryModule } from './user/user.repository.module';
import { Tenant } from './tenant/tenant.entity';
import { TenantRepositoryModule } from './tenant/tenant.repository.module';

export const entities = [User, Tenant];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: parseInt(configService.get('POSTGRES_PORT'), 10) || 5432,
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        synchronize: true,
        entities: entities,
      }),
      inject: [ConfigService],
    }),
    UsersRepositoryModule,
    TenantRepositoryModule,
  ],
  exports: [UsersRepositoryModule, TenantRepositoryModule],
})
export class DatabaseModule {}
