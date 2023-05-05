import { Injectable } from "@nestjs/common";
import { AppDataSource } from "src/config/data-source";
import { TrainingDto } from "src/dtos/training.dto";
import { Exercise } from "src/entities/exercise.entity";
import { Training } from "src/entities/training";
import { v4 } from "uuid";

@Injectable()
export class TrainingRepository{
    
    async createTraining(trainingDto: TrainingDto): Promise<any> {
                      
        const {name, exercises, repetitions, series, weight, observations } = trainingDto;

        var listExerciseId = [];

        const queryRunner = AppDataSource.createQueryRunner();
        
        await queryRunner.startTransaction();
        
        try {
            
            const newTraining = new Training();
            newTraining.id = v4();
            newTraining.name = name;

            await queryRunner.manager.createQueryBuilder()
                                    .insert()
                                    .into("training")
                                    .values(newTraining)
                                    .execute();
            
            for(var i =0; i < exercises.length; i++) {
    
                const newExercise = new Exercise;

                var id = v4();
                listExerciseId.push(id);
                newExercise.id = id;
                newExercise.name = exercises[i].name;
                newExercise.muscle_group = exercises[i].muscle_group;
                
                await queryRunner.manager.createQueryBuilder()
                                    .insert()
                                    .into("exercise")
                                    .values(newExercise)
                                    .execute();
            }

            for(var i =0; i < exercises.length; i++) {
    
                const newExercise = new Exercise;

                var id = v4();
                listExerciseId.push(id);
                newExercise.id = id;
                newExercise.name = exercises[i].name;
                newExercise.muscle_group = exercises[i].muscle_group;
                await queryRunner.manager.createQueryBuilder()
                                    .insert()
                                    .into("profile")
                                    .values(newExercise)
                                    .execute();
            };
            await queryRunner.commitTransaction();

            // return newTrainig;
        } 
        catch (error) {
            queryRunner.rollbackTransaction();
            console.log(error);
            throw "Erro ao tentar salvar os dados do aluno."
        }        
    }

    fetchAllTraining() {
        return AppDataSource.createQueryBuilder()
                            .select("p.id, ps.name, t.name as last_training")
                            .from("pupil", "p")
                            .innerJoin("person", "ps","ps.id = p.person_fk")
                            .leftJoin("schedule", "s", "s.pupil_fk = p.id")
                            .leftJoin("training_exercise", "te","te.schedule_fk = s.id")
                            .leftJoin("training","t", "te.training_fk = t.id")
                            .execute();
    }
}