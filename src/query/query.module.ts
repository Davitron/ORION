import { Module } from '@nestjs/common';
import { QueryService } from './query.service';

@Module({
  exports: [QueryService],
  providers: [QueryService],
})
export class QueryModule {}
