import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
