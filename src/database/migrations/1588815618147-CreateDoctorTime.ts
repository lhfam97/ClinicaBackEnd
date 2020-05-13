import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class CreateDoctorTime1588815618147 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctor_times',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'doctor_id',
            type: 'uuid',
          },
          {
            name: 'time_id',
            type: 'uuid',
          },
          {
            name: 'available',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'doctor_times',
      new TableForeignKey({
        name: 'ScheduleDoctor',
        columnNames: ['doctor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'doctors',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'doctor_times',
      new TableForeignKey({
        name: 'ScheduleTime',
        columnNames: ['time_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'times',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctor_times');
  }
}
