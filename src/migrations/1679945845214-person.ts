import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class person1679945845214 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "person",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "name",
                            type: "varchar",
                            length: "100"
                        },
                        {
                            name: "birthday",
                            type: "date",                            
                        },
                        {
                            name: "gender",
                            type: "varchar",
                            length: "15"
                        },
                        {
                            name: "access_fk",
                            type: "uuid",
                        }
                    ]
                }
            ),
            true
        );
        await queryRunner.createForeignKey(
            "person",
            new TableForeignKey(
                {
                    columnNames: ["access_fk"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "access"
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("person");
    }
}
