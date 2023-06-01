import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Assessment1684971974836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "assessment",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "current_weight",
                            type: "numeric"
                        },
                        {
                            name: "hight",
                            type: "numeric"
                        },
                        {
                            name: "subscapularis",
                            type: "numeric"
                        },
                        {
                            name: "bicipital",
                            type: "numeric"
                        },
                        {
                            name: "thickness",
                            type: "numeric"
                        },
                        {
                            name: "midaxillary",
                            type: "numeric"
                        },
                        {
                            name: "suprailiac",
                            type: "numeric"
                        },
                        {
                            name: "breastplate",
                            type: "numeric"
                        },
                        {
                            name: "abdominal",
                            type: "numeric"
                        },
                        {
                            name: "thigh",
                            type: "numeric"
                        },
                        {
                            name: "calf",
                            type: "numeric"
                        },
                        {
                            name: "fat_ideal",
                            type: "numeric"
                        },
                        {
                            name: "current_fat",
                            type: "numeric"
                        },
                        {
                            name: "lean_mass",
                            type: "numeric"
                        },
                        {
                            name: "fat_mass",
                            type: "numeric"
                        },
                        {
                            name: "bmi",
                            type: "numeric"
                        },
                        {
                            name: "pupil_fk",
                            type: "uuid"
                        }
                    ]
                }
            ),
            true
        );

        await queryRunner.createForeignKey(
            "assessment",
            new TableForeignKey(
                {
                    columnNames: ["pupil_fk"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "pupil"
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("assessment");
    }

}
