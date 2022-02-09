import { NestFactory } from '@nestjs/core';
import { ProcessorModule } from './processor.module';
import { ProcessorService } from './processor.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(ProcessorModule);
  const processorService = app.get(ProcessorService);
  await processorService.start();
}
bootstrap();
