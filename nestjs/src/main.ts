import { AllExceptionsFilter } from './exception.filter';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { PORT } from './config';
import * as db from './db';

async function bootstrap() {
  await db.connection_pool;
  const app = await NestFactory.create(AppModule);
  await app
    .useGlobalFilters(new AllExceptionsFilter())
    .useGlobalPipes(new ValidationPipe({ transform: true, disableErrorMessages: false }))
    .listen(PORT);
}
bootstrap();
