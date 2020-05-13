import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnPasswordToDoctor1589397126900 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'doctors',
            new TableColumn({
                name: 'password',
                type: "varchar"
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('doctors', 'password')
    }

}
