import { NestFactory } from '@nestjs/core';
import { RabbitConstants } from 'core/core/helpers/common.helper';
import { RabbitMqHelper } from 'core/core/helpers/rabbitmq.helper';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await RabbitMqHelper.createConnection(RabbitConstants.connectionName);
  await app.listen(3000);
}
bootstrap();
