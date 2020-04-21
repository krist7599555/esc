import { BaseErrorFilter } from './errors/base_error.filter';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { PORT } from './config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as db from './db';
import * as morgan from 'morgan';
import { ValidationException } from './errors/validation.exception';
import { ValidationExceptionFilter } from './errors/validation.filter';

async function bootstrap() {
  await db.connection_pool;
  await db.ensure_table();
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('ESC api')
    .setDescription('The ESC API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app
    .use(morgan('dev'))
    .useGlobalFilters(new BaseErrorFilter())
    .useGlobalFilters(new ValidationExceptionFilter())
    .useGlobalPipes(new ValidationPipe({
      exceptionFactory(errs) {
        return new ValidationException(errs);
      },
    }))
    .listen(PORT);
}
bootstrap();
