import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddForeignKeyPatient1589403291484 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey(
            'consultas',
            new TableForeignKey({
                name: 'Patient',
                columnNames: ['patient_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'patients',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('consultas', 'Patient');
    }

}
