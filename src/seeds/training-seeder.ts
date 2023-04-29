import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { v4 } from "uuid";
require("dotenv").config();

export class TrainingSeeder implements Seeder{
   
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        
        var training = [
                            {id: v4(), name: "Treino A"},
                            {id: v4(), name: "Treino B"},
                            {id: v4(), name: "Treino C"},
                            {id: v4(), name: "Treino D"},
                            {id: v4(), name: "Treino E"},
                            {id: v4(), name: "Aquecimento"},
                            {id: v4(), name: "Iniciante"}
                        ];
        
        await dataSource.createQueryBuilder()
                        .insert()
                        .into("training")
                        .values(training)
                        .execute();
        }    
}