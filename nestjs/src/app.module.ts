import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleController } from './controller/people';
import { RoomsController } from './controller/rooms';
import { ReservationsController } from './controller/reservations';
import { AuthController } from './controller/auth';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { AppExceptionFilter, HttpExceptionFilter, ValidateExceptionFilter } from './app.exception.filter';
import { ValidationError } from 'class-validator';
import { ApiErrors } from './serialize.errors';

@Module({
  imports: [],
  controllers: [
    AppController, 
    PeopleController, 
    RoomsController, 
    ReservationsController, 
    AuthController
  ],
  providers: [
    AppService,
    { 
      provide: APP_PIPE,  
      useFactory: () => new ValidationPipe({
        transform: true,
        whitelist: true, // only value in class
        transformOptions: {
          enableImplicitConversion: false,
        },
        exceptionFactory(errors: ValidationError[]) {
          return ApiErrors.fromClassValidatorErrors(errors);
        }
      })
    },
    { provide: APP_FILTER, useClass: AppExceptionFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_FILTER, useClass: ValidateExceptionFilter },
  ],
})
export class AppModule {}
