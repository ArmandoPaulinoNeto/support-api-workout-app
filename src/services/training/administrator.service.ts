import { Injectable } from '@nestjs/common';
import { TrainingRepository } from 'src/repositories/training.repository';

@Injectable()
export class TrainingService {
           
    constructor(private trainingRepository: TrainingRepository){}    
   
    fetchAllTraining() {
        return this.trainingRepository.fetchAllTraining();
    }    
}
