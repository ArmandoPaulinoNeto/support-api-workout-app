import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class training1679946210146 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "training",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "name",
                            type: "varchar",
                            length: "50",
                            isNullable: false
                        }
                    ]
                }
            ),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("training");
    }
}
