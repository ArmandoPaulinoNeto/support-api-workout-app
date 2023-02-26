import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class user1676748464983 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table(
                        {
                            name: "user",
                            columns: [
                                {
                                    name: "id",
                                    type: "uuid",
                                    isPrimary: true
                                },
                                {
                                    name: "email",
                                    type: "varchar",
                                    length: "150"
                                },
                                {
                                    name: "password",
                                    type: "varchar",
                                    length: "100"
                                },
                                {
                                    name: "username",
                                    type: "varchar",
                                    length: "50"
                                },
                                {
                                    name: "membership_fk",
                                    type: "uuid"
                                }
                            ]
                        }
                    )
                );
                await queryRunner.createForeignKey(
                "user",
                new TableForeignKey(
                    {
                        columnNames: ["membership_fk"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "membership"
                    }
                )
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}
