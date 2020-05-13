import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnPasswordToPatient1589397567088 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'patients',
            new TableColumn({
                name: 'password',
                type: "varchar"
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('patients', 'password')
    }

}
