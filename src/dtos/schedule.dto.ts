import { Exercise } from "src/entities/exercise.entity";

export class ScheduleDto{
    id: String;
    status: boolean;
    pupilFK: String;
    trainingDay: String;    
    scheduledBy: String;
    observations: String[];
    trainingFK: String;
    trainingExerciseId: String;
    exercisesFK: String[];
    repetitions: String[];
    series: String[];
    weight: String[];
}