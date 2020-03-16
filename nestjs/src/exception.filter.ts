import * as _ from 'lodash';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    const ctx      = host.switchToHttp();
    const response = ctx.getResponse();
    const request  = ctx.getRequest();
    const status   =
    exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg = exception?.message?.message || exception?.message;

    let body = null;
    if (_.isString(msg)) {
      body = { message: msg };
    } else if (_.isArray(msg) && msg.length > 0 && msg[0] instanceof ValidationError) {
      const validations = _.flatMap(msg, (o: ValidationError) => _.values(o.constraints));
      body = { message: _.first(validations), validations };
    } else {
      console.error();
      console.error('> [UNKNOW ERROR ESC] <');
      console.error(exception);
      console.error(msg);
      console.error();
      body = { message: 'server can\'t process' };
    }

    response.status(status).json({
      code:      status,
      path:      request.url,
      timestamp: new Date().getTime() / 1000,
      ...body,
    });
  }
}