import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'report' })
export class Report {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @Column({ name: 'created_date_time' })
  createdDateTime: Date;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'processed_date_time', nullable: true })
  processedDateTime?: Date;

  @Column({ name: 'compared_texts', nullable: true, type: 'jsonb' })
  comparedTexts?: [string];

  @Column({ name: 'result', nullable: true, type: 'jsonb' })
  result?: ReportResult;
}

export class ReportResult {
  result: number;
}
