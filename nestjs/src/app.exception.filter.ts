import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
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
            type: "InternalError", 
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

const defaultHttpMessage = {
  200: "OK",
  201: "Created",
  204: "No Content",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  500: "Internal Server Error",
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response
      .status(status)
      .json({
        errors: [
          {
            type: defaultHttpMessage[status] || "Error",
            code: status,
            detail: exception.message
          }
        ]
      });
  }
}