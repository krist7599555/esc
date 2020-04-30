import { PORT, HOST } from './config';
import { BaseErrorFilter } from './errors/base_error.filter';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as db from './db';
import * as morgan from 'morgan';
import { ValidationException } from './errors/validation.exception';
import { ValidationExceptionFilter } from './errors/validation.filter';
import * as express_list_routes from 'express-list-routes';

export async function esc_server() {
  await db.connection_pool;
  await db.ensure_table();
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('ESC api')
    .setDescription('The ESC API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document);

  return app
    .use(morgan('dev'))
    .useGlobalFilters(new BaseErrorFilter())
    .useGlobalFilters(new ValidationExceptionFilter())
    .useGlobalPipes(new ValidationPipe({
      exceptionFactory(errs) {
        return new ValidationException(errs);
      },
    }));
}

export async function bootstrap() {
  const app = await esc_server();
  return app.listen(PORT, () => {
    console.log(`listen to http://${HOST}:${PORT}`);
    // const server = app.getHttpServer();
    // const router = server._events.request._router;
    // console.log(server._events.request._router);
    // express_list_routes({}, 'API:', router);
  });
}
