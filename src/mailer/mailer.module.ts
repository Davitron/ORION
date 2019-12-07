import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  exports: [MailService],
  providers: [MailService],
  imports: [ConfigModule]
})
export class MailerModule {}
