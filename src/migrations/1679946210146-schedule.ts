import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class schedule1679946210146 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "schedule",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "status",
                            type: "boolean"
                        },
                        {
                            name: "date",
                            type: "timestamp",
                            default: "now()"
                        },
                        {
                            name: "training_day",
                            type: "varchar",
                            length: "15"
                        },
                        {
                            name: "pupil_fk",
                            type: "uuid"
                        },
                        {
                            name: "teacher_fk",
                            type: "uuid"
                        }
                    ]
                }
            ),
            true
        );
        await queryRunner.createForeignKeys(
            "schedule",
            [
                new TableForeignKey(
                    {
                        columnNames: ["pupil_fk"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "pupil"
                    }
                ),
                new TableForeignKey(
                    {
                        columnNames: ["teacher_fk"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "teacher"
                    }
                )               
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("schedule");
    }

}
