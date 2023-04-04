import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class exercise1679946348812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "exercise",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "name",
                            type: "varchar",
                            length: "100",
                            isNullable: false
                        },
                        {
                            name: "muscle_group",
                            type: "varchar",
                            length: "15",
                            isNullable: false
                        }

                    ]
                }
            ),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("exercise");
    }

}
