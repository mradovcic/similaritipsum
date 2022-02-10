import { Injectable } from '@nestjs/common';
import { Report, ReportCoreService } from 'core/core';
import { RabbitConstants } from 'core/core/helpers/common.helper';
import { RabbitMqHelper } from 'core/core/helpers/rabbitmq.helper';
import { SimilarityCalculator } from 'core/core/helpers/similarityCalculator.helper';

@Injectable()
export class ProcessorService {
  constructor(private readonly reportCoreService: ReportCoreService) {
    this.msgHandler.bind(this);
  }
  async start(): Promise<void> {
    const connection = await RabbitMqHelper.createConnection('connection');
    await RabbitMqHelper.initializeListener(
      connection,
      RabbitConstants.reportQueueName,
      RabbitConstants.reportExchange,
      [RabbitConstants.reportRequestRouting],
      this.msgHandler,
      1,
    );
  }

  msgHandler = async (msg: Report): Promise<void> => {
    let result: number = null;
    try {
      result = SimilarityCalculator.calculateSimilarity(
        msg.firstText,
        msg.secondText,
      );
    } catch (err) {
      console.error(err);
    }

    msg.status = !!result ? 'processed' : 'rejected';
    msg.result = result;
    msg.processedDateTime = new Date();
    this.reportCoreService.update(msg);
  };
}
