import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';
import { AllExceptionsFilter } from './exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .useGlobalFilters(new AllExceptionsFilter())
    .listen(config.port);
}
bootstrap();
