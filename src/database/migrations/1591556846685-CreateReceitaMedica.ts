import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';


export class CreateReceitaMedica1591556846685 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'receitas_medicas',
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
            'receitas_medicas',
            new TableForeignKey({
                name: 'ConsultaReceita',
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
        await queryRunner.dropTable('receitas_medicas');
    }
}
