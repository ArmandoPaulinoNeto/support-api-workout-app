import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class trainingExercise1679967319508 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table(
                {
                    name: "training_exercise",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "repetitions",
                            type: "numeric"
                        },
                        {
                            name: "series",
                            type: "numeric"
                        },                        
                        {
                            name: "weight",
                            type: "numeric"
                        },
                        {
                            name: "observation",
                            type: "varchar",
                        },
                        {
                            name: "training_fk",
                            type: "uuid"
                        },
                        {
                            name: "exercise_fk",
                            type: "uuid"
                        },
                        {
                            name: "schedule_fk",
                            type: "uuid"
                        }
                    ]
                }
            ),
            true
        );
        await queryRunner.createForeignKeys(
            "training_exercise",
            [
                new TableForeignKey(
                    {
                        columnNames: ["training_fk"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "training"
                    }
                ),
                new TableForeignKey(
                    {
                        columnNames: ["exercise_fk"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "exercise"
                    }
                ),
                new TableForeignKey(
                    {
                        columnNames: ["schedule_fk"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "schedule"
                    }
                )
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("training_exercise");
    }

}
