import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupOpenAPI } from './openAPI';
import { setupValidation } from './validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  setupOpenAPI(app);
  setupValidation(app);

  await app.listen(3200);
}
bootstrap();
