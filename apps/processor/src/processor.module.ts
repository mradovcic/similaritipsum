import { Module } from '@nestjs/common';
import { ProcessorService } from './processor.service';

@Module({
  imports: [],
  providers: [ProcessorService],
})
export class ProcessorModule {}
