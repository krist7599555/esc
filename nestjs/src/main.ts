import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ensureDatabase } from './db/pool';
import { PORT } from './config';
import * as morgan from 'morgan'
import * as path from 'path';

export async function server() {
  await ensureDatabase();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: false, cors: true });
  app.use(morgan('dev'))

  return app;
}
export async function appHttp() {
  const app = await server();
  await app.init();
  return app.getHttpServer();
}
export async function bootstrap() {
  const app = await server();
  await app.listen(PORT);
}
if (process.env.NODE_ENV != 'test') {
  bootstrap();
}
