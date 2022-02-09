import { Module } from '@nestjs/common';
import { TextGeneratorController } from '../controllers/textGenerator.controller';
import { TextGeneratorService } from '../services/textGenerator.service';

@Module({
  imports: [],
  controllers: [TextGeneratorController],
  providers: [TextGeneratorService],
})
export class AppModule {}
