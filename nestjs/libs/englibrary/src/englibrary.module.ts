import { HttpModule, Module } from '@nestjs/common';
import { EnglibraryService } from './englibrary.service';

@Module({
  providers: [EnglibraryService],
  imports:   [HttpModule],
  exports:   [EnglibraryService],
})
export class EnglibraryModule {}
