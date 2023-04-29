import { EncriptorBcrypt } from "src/util/encriptor-bcrypt";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { v4 } from "uuid";
require("dotenv").config();

export class ExerciseSeeder implements Seeder{
   
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        
        var exercises = [
                            {id: v4(), name: "Barra", muscle_group: "COSTAS"},
                            {id: v4(), name: "Puxada alta", muscle_group: "COSTAS"},
                            {id: v4(), name: "Remada fixa", muscle_group: "COSTAS"},
                            {id: v4(), name: "Remada baixa", muscle_group: "COSTAS"},
                            {id: v4(), name: "Remada unilateral com halteres", muscle_group: "COSTAS"},
                            {id: v4(), name: "Remada curvada com barra", muscle_group: "COSTAS"},
                            {id: v4(), name: "Voador invertido", muscle_group: "COSTAS"},
                            {id: v4(), name: "Supino reto barra", muscle_group: "PEITO"},
                            {id: v4(), name: "Supino reto halteres", muscle_group: "PEITO"},
                            {id: v4(), name: "Supino declinado", muscle_group: "PEITO"},
                            {id: v4(), name: "Supino inclinado halteres", muscle_group: "PEITO"},
                            {id: v4(), name: "Crucifixo banco reto", muscle_group: "PEITO"},
                            {id: v4(), name: "Crucifixo vc inclinado", muscle_group: "PEITO"},
                            {id: v4(), name: "Pullover", muscle_group: "PEITO"},
                            {id: v4(), name: "Cross over", muscle_group: "PEITO"},
                            {id: v4(), name: "Voador", muscle_group: "PEITO"},
                            {id: v4(), name: "Supino na máquina", muscle_group: "PEITO"},
                            {id: v4(), name: "Elevação lateral", muscle_group: "OMBRO"},
                            {id: v4(), name: "Elevação frontal", muscle_group: "OMBRO"},
                            {id: v4(), name: "Desenvolvimento com halteres", muscle_group: "OMBRO"},
                            {id: v4(), name: "Desenvolvimento com barra", muscle_group: "OMBRO"},
                            {id: v4(), name: "Remada alta", muscle_group: "OMBRO"},
                            {id: v4(), name: "Desenvolvimento Arnold", muscle_group: "OMBRO"},
                            {id: v4(), name: "Elevação lateral curvada", muscle_group: "OMBRO"},
                            {id: v4(), name: "Bíceps unilateral banco", muscle_group: "BÍCEPS"},
                            {id: v4(), name: "Bíceps unilateral Na coxa", muscle_group: "BÍCEPS"},
                            {id: v4(), name: "Rosca direta", muscle_group: "BÍCEPS"},
                            {id: v4(), name: "Bíceps invertido", muscle_group: "BÍCEPS"},
                            {id: v4(), name: "Tríceps unil invertido", muscle_group: "TRÍCEPS"},
                            {id: v4(), name: "Tríceps polia", muscle_group: "TRÍCEPS"},
                            {id: v4(), name: "Tríceps Corda", muscle_group: "TRÍCEPS"},
                            {id: v4(), name: "Tríceps Testa", muscle_group: "TRÍCEPS"},
                            {id: v4(), name: "Tríceps No banco", muscle_group: "TRÍCEPS"},
                            {id: v4(), name: "Tríceps Curvado polia", muscle_group: "TRÍCEPS"},
                            {id: v4(), name: "Cad extensora", muscle_group: "PEITO"},
                            {id: v4(), name: "Leg 45", muscle_group: "PEITO"},
                            {id: v4(), name: "Leg 90", muscle_group: "PEITO"},
                            {id: v4(), name: "Leg 180", muscle_group: "PEITO"},
                            {id: v4(), name: "Leg hack", muscle_group: "PEITO"},
                            {id: v4(), name: "Agachamento livre", muscle_group: "PEITO"},
                            {id: v4(), name: "Búlgaro", muscle_group: "PEITO"},
                            {id: v4(), name: "Pernada com ou sem Step", muscle_group: "PEITO"},
                            {id: v4(), name: "Passada", muscle_group: "PEITO"},
                            {id: v4(), name: "Mesa flexora", muscle_group: "PEITO"},
                            {id: v4(), name: "Cad flexora", muscle_group: "PEITO"},
                            {id: v4(), name: "Agachamento sumo", muscle_group: "PEITO"},
                            {id: v4(), name: "Pantorrilha na máquina", muscle_group: "PEITO"},
                            {id: v4(), name: "Pantorrilha cavalinho", muscle_group: "PEITO"},
                            {id: v4(), name: "Pantorrilha no Leg", muscle_group: "PEITO"},
                        ];
        
        await dataSource.createQueryBuilder()
                        .insert()
                        .into("exercise")
                        .values(exercises)
                        .execute();
        }    
}