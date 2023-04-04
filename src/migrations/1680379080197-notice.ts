import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class notice1680379080197 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "notice",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "title",
                            type: "varchar",
                            length: "25",
                        },
                        {
                            name: "description",
                            type: "varchar"
                        },
                        {
                            name: "image",
                            type: "varchar"
                        },
                        {
                            name: "administrator_fk",
                            type: "uuid"
                        }
                    ]
                }
            )
        );
        await queryRunner.createForeignKey(
            "notice",
            new TableForeignKey(
                {
                    columnNames:["administrator_fk"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "administrator"
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("notice")
    }

}
