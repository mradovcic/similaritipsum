import { HttpException, Injectable } from '@nestjs/common';
import {
  CreateReportRequest,
  Report,
  ReportCoreService,
  ReportResponse,
} from 'core/core';
import { RabbitConstants } from 'core/core/helpers/common.helper';
import { RabbitMqHelper } from 'core/core/helpers/rabbitmq.helper';

const PG_UNIQUE_CONSTRAINT_VIOLATION = '23505';

@Injectable()
export class ReportService {
  constructor(private readonly reportCoreService: ReportCoreService) {}

  async createAndPublishReport(request: CreateReportRequest): Promise<void> {
    const report = new Report(
      request.id,
      request.firstText,
      request.secondText,
    );

    try {
      await this.reportCoreService.add(report);
      await RabbitMqHelper.publish(
        RabbitConstants.connectionName,
        report,
        RabbitConstants.reportExchange,
        RabbitConstants.reportRequestRouting,
      );
    } catch (err) {
      if (err && err.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        return;
      }
      throw err;
    }
  }

  async getById(id: string): Promise<ReportResponse> {
    const report = await this.reportCoreService.getById(id);
    if (!report) {
      throw new HttpException(`Report ${id} not found`, 404);
    }

    return {
      firstText: report.firstText,
      secondText: report.secondText,
      status: report.status,
      processedDateTime: report.processedDateTime,
      result: report.result,
    } as ReportResponse;
  }
}
