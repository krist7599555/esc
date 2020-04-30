import { ArgumentsHost, ExceptionFilter, Catch } from '@nestjs/common';
import { ValidationException } from './validation.exception';


@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    // console.log('simple', exception);
    const ctx      = host.switchToHttp();
    const response = ctx.getResponse();
    const request  = ctx.getRequest();
    response.status(400).json({
      code:      400,
      path:      request.url,
      timestamp: new Date().getTime() / 1000,
      message:   exception.message,
      validate:  exception.validate,
    });
  }
}