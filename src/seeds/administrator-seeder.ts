import { EncriptorBcrypt } from "../util/encriptor-bcrypt";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { v4 } from "uuid";
require("dotenv").config();

export class AdministratorSeeder implements Seeder{
   
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {        
        
        var password = await new EncriptorBcrypt().generatorHash(process.env.DEFAULT_PASSWORD_ADMINISTRATOR);
        var email = process.env.DEFAULT_EMAIL_ADMINISTRATOR;

        var profile = {id: v4(), photo: "avatar", role: "administrator"};
        var access = {id: v4(), email: email, password: password, profile_fk: profile.id};
        var administrator = {id: v4(), name: "administrador", access_fk: access.id};
        
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.startTransaction();
                    
        try {            
            await queryRunner.manager.createQueryBuilder()
                                .insert()
                                .into("profile")
                                .values(profile)
                                .execute();

            await queryRunner.manager.createQueryBuilder()
                                .insert()
                                .into("access")
                                .values(access)
                                .execute();

            await queryRunner.manager.createQueryBuilder()
                                .insert()
                                .into("administrator")
                                .values(administrator)
                                .execute();

            await queryRunner.commitTransaction();
            return "Administrador pradrão criado com sucesso!";
        } 
        catch (error) {
            queryRunner.rollbackTransaction();
            console.log(error);
            throw "Erro ao tentar criar o administrator pradrão!"
        }                   
    }    
}