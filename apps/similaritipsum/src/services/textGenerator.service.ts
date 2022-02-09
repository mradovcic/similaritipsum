import { Injectable } from '@nestjs/common';
import { LoremIpsum } from 'lorem-ipsum';

@Injectable()
export class TextGeneratorService {
  getText(numberOfWords: number): string {
    const lorem = new LoremIpsum();
    return lorem.generateWords(numberOfWords);
  }
}
