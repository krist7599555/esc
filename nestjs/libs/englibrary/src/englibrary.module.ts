import { Module } from '@nestjs/common';
import { EnglibraryService } from './englibrary.service';

@Module({
  providers: [EnglibraryService],
  exports: [EnglibraryService],
})
export class EnglibraryModule {}
