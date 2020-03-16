import { AllExceptionsFilter } from './exception.filter';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .useGlobalFilters(new AllExceptionsFilter())
    .useGlobalPipes(new ValidationPipe({ transform: true }))
    .listen(config.port);
}
bootstrap();
