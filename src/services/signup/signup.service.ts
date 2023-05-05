import { Injectable } from '@nestjs/common';
import { DataPupilDto } from 'src/dtos/data-pupil.dto';
import { TrainingDto } from 'src/dtos/training.dto';
import { PupilRepository } from 'src/repositories/pupil.repository';
import { TrainingRepository } from 'src/repositories/training.repository';
 
@Injectable()
export class SignupService {
    
    constructor(private pupilRepository: PupilRepository, private trainingRepository: TrainingRepository){}
    
    createPupil(dataPupilDto: DataPupilDto) {
        return this.pupilRepository.createPupil(dataPupilDto)
    }

    createTraining(trainingDto: TrainingDto) {
        this.trainingRepository.createTraining(trainingDto);
    }
}
