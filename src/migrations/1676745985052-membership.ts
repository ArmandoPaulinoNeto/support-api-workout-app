import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class membership1676745985052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "membership",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "name",
                            type: "varchar",
                            length: "45"
                        },
                        {
                            name: "cpf",
                            type: "varchar",
                            length: "11"
                        },
                        {
                            name: "address",
                            type: "varchar",
                            length: "100"
                        },
                        {
                            name: "plate",
                            type: "varchar",
                            length: "25"
                        },
                        {
                            name: "access_profile_fk",
                            type: "uuid"
                        }
                    ]
                }
            ),
            true
        );
        await queryRunner.createForeignKey(
            "membership",
            new TableForeignKey(
                {
                    columnNames: ["access_profile_fk"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "access_profile"
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("membership", true);
    }

}
