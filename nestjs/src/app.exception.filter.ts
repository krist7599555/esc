import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ApiErrors, ApiError } from './serialize.errors';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errors: ApiError[] = [
      {
        title: "Internal Error", 
        status: 500,
        detail: exception.message,
      }
    ]
    response
      .status(500)
      .json({ errors });
  }
}

@Catch(ApiErrors)
export class ValidateExceptionFilter implements ExceptionFilter {
  catch(exception: ApiErrors, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response
      .status(exception.getStatus())
      .json({
        errors: exception.errors
      });
  }
}

const default_http_message: Record<number, string> = {
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
    const errors: ApiError[] = [
      {
        title: default_http_message[status] || "Error",
        detail: exception.message,
        status: status,
      }
    ];
    response
      .status(status)
      .json({ errors });
  }
}