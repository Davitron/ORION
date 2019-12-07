import { Module } from '@nestjs/common';
import { ErrorFilter } from './error-filter';

@Module({
  providers: [ErrorFilter],
})
export class InterceptorsModule {}
