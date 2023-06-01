import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class schedule1679946302435 implements MigrationInterface {

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
                            type: "boolean",
                            default: true
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
                            name: "training_fk",
                            type: "uuid"
                        },
                        {
                            name: "scheduled_by",
                            type: "uuid"
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
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
                        columnNames: ["training_fk"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "training"
                    }
                )
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("schedule");
    }

}
