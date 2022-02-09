import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '../entities/report.entity';
import { ReportCoreService } from '../services/reportCore.service';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  providers: [ReportCoreService],
  exports: [TypeOrmModule, ReportCoreService],
})
export class ReportCoreModule {}
