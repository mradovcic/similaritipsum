import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateReportRequest, GenerateWordsResponse } from 'core/core';
import { ReportService } from '../services/report.service';

@Controller('api/report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('create')
  @HttpCode(201)
  async create(@Body() body: CreateReportRequest): Promise<void> {
    await this.reportService.createAndPublishReport(body);
  }
}
