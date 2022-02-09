import { Injectable } from '@nestjs/common';
import { RabbitMqHelper } from 'core/core/helpers/rabbitmq.helper';

@Injectable()
export class ProcessorService {
  async start(): Promise<void> {
    const connection = await RabbitMqHelper.createConnection('connection');
    await RabbitMqHelper.initializeListener(
      connection,
      'Similaritypsum.Report',
      'Similaritypsum.Exchange',
      ['Similaritypsum.Report.Reques'],
      async (msg) => {
        console.log(msg);
      },
      1,
    );
  }
}
