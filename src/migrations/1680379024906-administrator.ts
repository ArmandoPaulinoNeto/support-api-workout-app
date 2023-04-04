import { type } from "os";
import { Column, MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class administrator1680379024906 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
               { 
                    name: "administrator",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "name",
                            type: "varchar",
                            length: "25",
                            default: "'Administrador'"
                        },
                        {
                            name: "access_fk",
                            type: "uuid",
                        }
                    ]
                }
            )
        );
        await queryRunner.createForeignKey(
            "administrator",
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
        await queryRunner.dropTable("adminitrator");
    }

}
