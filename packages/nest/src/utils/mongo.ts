import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import * as mongoose from 'mongoose';

@Catch()
export class MongooseExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('TCL: MongooseExceptionsFilter -> exception', exception);
    if (exception instanceof mongoose.Error) {
      console.log('FUCK MONGOOSE ERROR', exception);
    }
    return;
    throw exception;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const error = new Error(`${exception}`);

    const status =
      exception instanceof HttpException
        ? //@ts-ignore
          // @ts-ignore
          exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errorType: error.name,
      errorMessage: error.message,
    });
  }
}
