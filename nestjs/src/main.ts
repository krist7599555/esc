import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ensureDatabase } from './db/pool';
import "./serialize"
import { PORT } from './config';

export async function server() {
  await ensureDatabase();
  const app = await NestFactory.create(AppModule, { logger: false, cors: true });
  // app.useGlobalFilters(new AppExceptionFilter())
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
