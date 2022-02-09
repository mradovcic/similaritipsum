import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportCoreModule } from 'core/core';
import { getConnectionOptions } from 'typeorm';
import { ReportController } from '../controllers/report.controller';
import { TextGeneratorController } from '../controllers/textGenerator.controller';
import { ReportService } from '../services/report.service';
import { TextGeneratorService } from '../services/textGenerator.service';

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
  controllers: [TextGeneratorController, ReportController],
  providers: [TextGeneratorService, ReportService],
})
export class AppModule {}
