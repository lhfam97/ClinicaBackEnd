import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class CreatePagamento1590884803198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pagamentos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'consulta_id',
            type: 'uuid',
          },
          {
            name: 'tipo_pagamento_id',
            type: 'uuid',
          },
          {
            name: 'valor',
            type: 'decimal',
          },
          {
            name: 'data_pagamento',
            type: 'date',
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
      'pagamentos',
      new TableForeignKey({
        name: 'ConsultaPagamento',
        columnNames: ['consulta_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'consultas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'pagamentos',
      new TableForeignKey({
        name: 'TipoPagamento',
        columnNames: ['tipo_pagamento_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tipos_pagamento',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pagamentos');
  }
}
