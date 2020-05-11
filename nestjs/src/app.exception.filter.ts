import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { JsonApiErrors } from './serialize';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response
      .status(500)
      .json({
        errors: [
          { 
            type: "Internal Error", 
            detail: exception.message,
            meta: {
              stack: exception.stack
            }
          }
        ]
      });
  }
}

@Catch(JsonApiErrors)
export class ValidateExceptionFilter implements ExceptionFilter {
  catch(exception: JsonApiErrors, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response
      .status(400)
      .json({
        errors: exception.errors
      });
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response
      .status(exception.getStatus())
      .json({
        errors: [
          {
            type: "" + exception.getStatus(),
            detail: exception.message
          }
        ]
      });
  }
}