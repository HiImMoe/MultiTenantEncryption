import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControllerModule } from './controller/controller.module';
import { TenantMiddleware } from './middleware/tenant.middleware';
import { DatabaseModule } from './modules/database/database.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ControllerModule, ServiceModule, DatabaseModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
