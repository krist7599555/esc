import { AllExceptionsFilter, BadRequestExceptionFilter } from './exception.filter';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { PORT } from './config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as db from './db';
import * as morgan from 'morgan';

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
    .useGlobalFilters(new AllExceptionsFilter())
    .useGlobalFilters(new BadRequestExceptionFilter())
    .useGlobalPipes(new ValidationPipe({ transform: true, disableErrorMessages: false }))
    .listen(PORT);
}
bootstrap();
