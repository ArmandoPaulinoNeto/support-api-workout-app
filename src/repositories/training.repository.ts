import { Injectable } from "@nestjs/common";
import { AppDataSource } from "src/config/data-source";
import { TrainingDto } from "src/dtos/training.dto";
import { Training } from "src/entities/training";
import { v4 } from "uuid";

@Injectable()
export class TrainingRepository{
    
    async createTraining(trainingDto: TrainingDto): Promise<Training> {
                      
        const { name } = trainingDto;
            
        const newTraining = new Training();
        newTraining.id = v4();
        newTraining.name = name;

        await AppDataSource.createQueryBuilder()
                                .insert()
                                .into("training")
                                .values(newTraining)
                                .execute();
        return newTraining;
    }

    async fetchAllTraining() {
                
        return await AppDataSource.createQueryBuilder()
        .select("*")
        .from("training", "t")
        .execute();
    }
}