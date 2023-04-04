import { type } from "os";
import { Column, MigrationInterface, QueryRunner, Table } from "typeorm"

export class profile1679945657694 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "profile",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true,
                            isNullable: false
                        },
                        {
                            name: "photo",
                            type: "varchar",
                            default: "'avatar'"
                        },
                        {
                            name: "role",
                            type: "varchar",
                            length: "15"
                        }
                    ]
                }
            ),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("profile");
    }
}
