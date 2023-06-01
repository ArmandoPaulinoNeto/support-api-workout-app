import { Injectable } from "@nestjs/common";
import { AppDataSource } from "src/config/data-source";
import { ScheduleDto } from "src/dtos/schedule.dto";
import { Schedule } from "src/entities/schedule.entity";
import { TrainingExercise } from "src/entities/training-exercise.entity";
import { v4 } from "uuid";

@Injectable()
export class ScheduleRepository{
    
    async createSchedule(scheduleDto: ScheduleDto): Promise<String> {
                      
        const { pupilFK, trainingDay, scheduledBy, repetitions, series, weight, observations, trainingFK, exercisesFK } = scheduleDto;
        
        const queryRunner = AppDataSource.createQueryRunner();
        
        await queryRunner.startTransaction();
        
        try {
            const newSchedule = new Schedule();

            newSchedule.id = v4();
            newSchedule.pupil_fk = pupilFK;
            newSchedule.training_fk = trainingFK;
            newSchedule.training_day = trainingDay;
            newSchedule.scheduled_by = scheduledBy;

            await queryRunner.manager.createQueryBuilder()
                                        .insert()
                                        .into("schedule")
                                        .values(newSchedule)
                                        .execute();

                                        
            for(var i =0; i < exercisesFK.length; i++) {
                                
                const newTrainingExercise = new TrainingExercise;
                newTrainingExercise.id = v4();
                newTrainingExercise.repetitions = parseInt(repetitions[i].toString());
                newTrainingExercise.series = parseInt(series[i].toString());
                newTrainingExercise.weight = parseInt(weight[i].toString());
                newTrainingExercise.observation = observations[i];
                newTrainingExercise.exercise_fk = exercisesFK[i];                
                newTrainingExercise.schedule_fk = newSchedule.id;
                
                await queryRunner.manager.createQueryBuilder()
                                            .insert()
                                            .into("training_exercise")
                                            .values(newTrainingExercise)
                                            .execute();
            }
            await queryRunner.commitTransaction();
            return newSchedule.id;
        } 
        catch (error) {
            queryRunner.rollbackTransaction();
            console.log(error);
                throw "Erro ao tentar salvar os dados do agendamento do treino!"
        }        
    }
}