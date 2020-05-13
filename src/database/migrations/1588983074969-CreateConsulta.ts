import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class CreateConsulta1588983074969 implements MigrationInterface {
  // eslint-disable-next-line class-methods-use-this
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'consultas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'doctor_time_id',
            type: 'uuid',
          },
          {
            name: 'patient_id',
            type: 'uuid',
          },
          {
            name: 'cobertura_id',
            type: 'uuid',
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
      'consultas',
      new TableForeignKey({
        name: 'ConsultaPatient',
        columnNames: ['doctor_time_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'doctor_times',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'consultas',
      new TableForeignKey({
        name: 'CoberturaConsulta',
        columnNames: ['cobertura_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'coberturas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('consultas');
  }
}
