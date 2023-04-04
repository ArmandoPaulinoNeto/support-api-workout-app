import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class pupil1679946113570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "pupil",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "goal",
                            type: "varchar",
                            length: "100"
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
            "pupil",
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
        await queryRunner.dropTable("pupil");
    }

}
