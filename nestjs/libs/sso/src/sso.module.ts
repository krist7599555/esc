import { Module, HttpModule } from '@nestjs/common';
import { SsoService } from './sso.service';

@Module({
  providers: [SsoService],
  imports:   [HttpModule],
  exports:   [SsoService],
})
export class SsoModule {}
