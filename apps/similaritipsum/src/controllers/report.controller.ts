import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  Query,
} from '@nestjs/common';
import { CreateReportRequest, ReportResponse } from 'core/core';
import { isValidUuid } from 'core/core/helpers/common.helper';
import { ReportService } from '../services/report.service';

@Controller('api/report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('create')
  @HttpCode(201)
  async create(@Body() body: CreateReportRequest): Promise<void> {
    if (!isValidUuid(body.id)) {
      throw new HttpException('invalid_id', 400);
    }

    await this.reportService.createAndPublishReport(body);
  }

  @Get('fetch')
  async fetch(@Query('id') id: string): Promise<ReportResponse> {
    if (!isValidUuid(id)) {
      throw new HttpException('invalid_id', 400);
    }

    return await this.reportService.getById(id);
  }
}
