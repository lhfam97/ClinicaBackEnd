import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';


export class CreateExames1591645426557 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'exames',
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
                        name: 'descricao',
                        type: 'varchar',
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
            'exames',
            new TableForeignKey({
                name: 'ConsultaExame',
                columnNames: ['consulta_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'consultas',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

    }

    // eslint-disable-next-line class-methods-use-this
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('exames');
    }
}
