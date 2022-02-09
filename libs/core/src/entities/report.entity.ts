import { Entity, Column, PrimaryColumn } from 'typeorm';

export class ReportResult {
  result: number;
}

export declare type ReportStatus = 'created' | 'rejected' | 'processed';

@Entity({ name: 'report' })
export class Report {
  constructor(id: string, firstText: string, secondText: string) {
    this.id = id;
    this.createdDateTime = new Date();
    this.status = 'created';
    this.firstText = firstText;
    this.secondText = secondText;
  }

  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @Column({ name: 'created_date_time' })
  createdDateTime: Date;

  @Column({ name: 'status' })
  status: ReportStatus;

  @Column({ name: 'first_text' })
  firstText: string;

  @Column({ name: 'second_text' })
  secondText: string;

  @Column({ name: 'processed_date_time', nullable: true })
  processedDateTime?: Date;

  @Column({ name: 'result', type: 'numeric' })
  result?: number;
}
