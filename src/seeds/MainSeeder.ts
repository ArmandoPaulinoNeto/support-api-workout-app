import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager, runSeeder } from "typeorm-extension";
import { AdministratorSeeder } from "./administrator-seeder";
import { ExerciseSeeder } from "./exercise-seeder";
import { TrainingSeeder } from "./training-seeder";

export class MainSeeder implements Seeder{

    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {

        var entities = ["profile", "exercise", "training"];        

        if(await this.databaseIsEmpty(dataSource, entities)){
            await runSeeder(dataSource, AdministratorSeeder);
            await runSeeder(dataSource, ExerciseSeeder);
            await runSeeder(dataSource, TrainingSeeder);
        }
    }
    async databaseIsEmpty(dataSource: DataSource, entities: string[]){

        for(var entity of entities){
            var result = await dataSource.createQueryBuilder()
                .select("*")
                .from(entity, "entity")
                .getRawOne();            
            if (result) {
                return false;
            }
        }
        return true;
    }
}