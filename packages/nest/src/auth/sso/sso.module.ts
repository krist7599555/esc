import { Module, HttpService, HttpModule } from '@nestjs/common';
import { SsoService } from './sso.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [SsoService],
  exports: [SsoService],
})
export class SsoModule {}
