import { Injectable } from '@nestjs/common';
import { DataPupilDto } from 'src/dtos/data-pupil.dto';
import { ScheduleDto } from 'src/dtos/schedule.dto';
import { TrainingDto } from 'src/dtos/training.dto';
import { PupilRepository } from 'src/repositories/pupil.repository';
import { ScheduleRepository } from 'src/repositories/schedule.repository';
import { TrainingRepository } from 'src/repositories/training.repository';
 
@Injectable()
export class SignupService {
    
    constructor(private pupilRepository: PupilRepository, private trainingRepository: TrainingRepository, private scheduleRepository: ScheduleRepository){}
    
    createPupil(dataPupilDto: DataPupilDto) {
        return this.pupilRepository.createPupil(dataPupilDto)
    }

    createTraining(trainingDto: TrainingDto) {
        return this.trainingRepository.createTraining(trainingDto);
    }

    createSchedule(scheduleDto: ScheduleDto) {
        return this.scheduleRepository.createSchedule(scheduleDto);
    }
}
