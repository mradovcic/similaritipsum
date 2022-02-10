import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Report } from '../entities/report.entity';

@Injectable()
export class ReportCoreService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  getById(id: string): Promise<Report> {
    return this.reportRepository.findOne({ id: id });
  }

  add(report: Report): Promise<InsertResult> {
    return this.reportRepository.insert(report);
  }

  update(report: Report): Promise<Report> {
    return this.reportRepository.save(report);
  }
}
