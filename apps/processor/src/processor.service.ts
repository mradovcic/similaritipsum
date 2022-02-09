import { Injectable } from '@nestjs/common';
import { Report } from 'core/core';
import { RabbitConstants } from 'core/core/helpers/common.helper';
import { RabbitMqHelper } from 'core/core/helpers/rabbitmq.helper';
import { SimilarityCalculator } from 'core/core/helpers/similarityCalculator.helper';

@Injectable()
export class ProcessorService {
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

  async msgHandler(msg: Report): Promise<void> {
    console.log(msg);
    console.log(
      SimilarityCalculator.calculateSimilarity(msg.firstText, msg.secondText),
    );
  }
}
