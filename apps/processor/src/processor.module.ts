import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportCoreModule } from 'core/core';
import { getConnectionOptions } from 'typeorm';
import { ProcessorService } from './processor.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ReportCoreModule,
  ],
  providers: [ProcessorService],
})
export class ProcessorModule {}
