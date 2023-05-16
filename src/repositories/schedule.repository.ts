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
            newSchedule.training_day = trainingDay;
            newSchedule.scheduled_by = scheduledBy;

            await queryRunner.manager.createQueryBuilder()
                                    .insert()
                                    .into("schedule")
                                    .values(newSchedule)
                                    .execute();
            
            for(var i =0; i < exercisesFK.length; i++) {
    
                const newTraining = new TrainingExercise();
                newTraining.id = v4();
                newTraining.repetitions = parseInt(repetitions[i].toString());
                newTraining.series = parseInt(series[i].toString());
                newTraining.weight = parseInt(weight[i].toString());
                newTraining.observation = observations[i];
                newTraining.training_fk = trainingFK;
                newTraining.exercise_fk = exercisesFK[i];
                newTraining.schedule_fk = newSchedule.id;
                
                await queryRunner.manager.createQueryBuilder()
                                    .insert()
                                    .into("training_exercise")
                                    .values(newTraining)
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

    fetchAllSchedule() {
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