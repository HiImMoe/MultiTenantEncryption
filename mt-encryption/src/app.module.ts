import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControllerModule } from './controller/controller.module';
import { TenantMiddleware } from './middleware/tenant.middleware';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [ConfigModule.forRoot(), ControllerModule, ServiceModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
