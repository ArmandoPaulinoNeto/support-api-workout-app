import { Exercise } from "src/entities/exercise.entity";

export class ScheduleDto{
    status: boolean;
    pupilFK: String;
    trainingDay: Date;    
    scheduledBy: String;
    observations: String[];
    trainingFK: String;
    exercisesFK: string[];
    repetitions: String[];
    series: String[];
    weight: String[];
}