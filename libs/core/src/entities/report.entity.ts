import { Entity, Column, PrimaryColumn } from 'typeorm';

export class ReportResult {
  result: number;
}

@Entity({ name: 'report' })
export class Report {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @Column({ name: 'created_date_time' })
  createdDateTime: Date;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'first_text' })
  firstText: string;

  @Column({ name: 'second_text' })
  secondText: string;

  @Column({ name: 'processed_date_time', nullable: true })
  processedDateTime?: Date;

  @Column({ name: 'result', type: 'numeric' })
  result?: number;
}
