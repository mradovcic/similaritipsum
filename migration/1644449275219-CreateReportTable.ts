import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReportTable1644449275219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE similaritipsum.report (
            id uuid NOT NULL,
            created_date_time timestamp NOT NULL,
            status text NOT NULL,
            first_text text NOT NULL,
            second_text text NOT NULL,
            processed_date_time timestamp,
            result numeric,
            CONSTRAINT pk_report PRIMARY KEY (id)
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('similaritypsum.report', true);
  }
}
