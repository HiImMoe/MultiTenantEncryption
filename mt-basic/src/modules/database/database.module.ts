import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/user.entity';
import { UsersRepositoryModule } from './user/user.repository.module';
import { Tenant } from './tenant/tenant.entity';
import { TenantRepositoryModule } from './tenant/tenant.repository.module';
import { EmployeeRepositoryModule } from './employee/employee.module';
import { Employee } from './employee/employee.entity';
import { PerformanceRating } from './performance-rating/performance-rating.entity';
import { PerformanceRatingRepositoryModule } from './performance-rating/performance-rating.module';
import { Boni } from './boni/boni.entity';
import { BoniRepositoryModule } from './boni/boni.module';
import { MissingDayRepositoryModule } from './missingDay/missing-day.module';
import { MissingDay } from './missingDay/missing-day.entity';

export const entities = [User, Tenant, Employee, PerformanceRating, Boni, MissingDay];

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
    EmployeeRepositoryModule,
    PerformanceRatingRepositoryModule,
    BoniRepositoryModule,
    MissingDayRepositoryModule,
  ],
  exports: [
    UsersRepositoryModule,
    TenantRepositoryModule,
    EmployeeRepositoryModule,
    PerformanceRatingRepositoryModule,
    BoniRepositoryModule,
    MissingDayRepositoryModule,
  ],
})
export class DatabaseModule {}
