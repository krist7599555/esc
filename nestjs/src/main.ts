import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';
import { AllExceptionsFilter } from './exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .useGlobalFilters(new AllExceptionsFilter())
    .useGlobalPipes(new ValidationPipe({ transform: true }))
    .listen(config.port);
}
bootstrap();
