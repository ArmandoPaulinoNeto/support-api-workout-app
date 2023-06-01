import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class notice1684716799799 implements MigrationInterface {

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
                            name: "image",
                            type: "varchar",
                            isNullable: false
                        },
                        {
                            name: "status",
                            type: "boolean",
                            isNullable: false
                        },
                        {
                            name: "administrator_fk",
                            type: "uuid"
                        }
                    ]
                }
            ),
            true
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
