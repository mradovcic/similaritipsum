import { Controller, Get, Query } from '@nestjs/common';
import { GenerateWordsResponse } from 'core/core';
import { TextGeneratorService } from '../services/textGenerator.service';

@Controller('api/generator')
export class TextGeneratorController {
  constructor(private readonly textGeneratorService: TextGeneratorService) {}

  @Get('generate')
  getText(@Query('n') n?: string): GenerateWordsResponse {
    const numberOfWords = !!n ? Number.parseInt(n) : 50;
    return {
      result: this.textGeneratorService.getText(numberOfWords),
    } as GenerateWordsResponse;
  }
}
