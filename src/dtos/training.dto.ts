import { Exercise } from "src/entities/exercise.entity";

export class TrainingDto{
    name: String;
    exercises: Exercise[];    
    repetitions: String[];
    series: String[];
    weight: String[];
    observations: String[];
}