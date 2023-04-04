import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class teacher1679946025596 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "teacher",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "cref",
                            type: "varchar",
                            length: "25"
                        },
                        {
                            name: "person_fk",
                            type: "uuid"
                        }
                    ]
                }
            ),
            true
        );
        await queryRunner.createForeignKey(
            "teacher",
            new TableForeignKey(
                {
                    columnNames: ["person_fk"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "person"
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("teacher");
    }

}
