import { flatten } from "@nestjs/common";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class access1679945755732 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "access",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "email",
                            type: "varchar",
                            length: "50",
                            isNullable: false
                        },
                        {
                            name: "password",
                            type: "varchar",
                            isNullable: false
                        },
                        {
                            name: "profile_fk",
                            type: "uuid"
                        }
                    ]
                }
            ),
            true
        );
        await queryRunner.createForeignKey(
            "access",
            new TableForeignKey(
                {
                    columnNames: ["profile_fk"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "profile"
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("access");
    }

}
