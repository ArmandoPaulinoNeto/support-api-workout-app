import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class accessProfile1676743254030 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "access_profile",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "role",
                            type: "varchar",
                            isNullable: false,
                            length: "10",
                            default: "user"
                        }
                    ]
                }
            ),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("access_profile", true);
    }

}
