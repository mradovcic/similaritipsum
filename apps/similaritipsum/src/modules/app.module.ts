import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportModule } from 'core/core';
import { getConnectionOptions } from 'typeorm';
import { TextGeneratorController } from '../controllers/textGenerator.controller';
import { TextGeneratorService } from '../services/textGenerator.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ReportModule,
  ],
  controllers: [TextGeneratorController],
  providers: [TextGeneratorService],
})
export class AppModule {}
