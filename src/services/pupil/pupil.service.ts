import { Injectable } from '@nestjs/common';
import { PupilDto } from 'src/dtos/pupil.dto';
import { ScheduleDto } from 'src/dtos/schedule.dto';
import { TrainingExerciseDto } from 'src/dtos/training-exercise.dto';
import { PupilRepository } from 'src/repositories/pupil.repository';

@Injectable()
export class PupilService {
    constructor(private pupilRepository: PupilRepository){}
    
    fetchAllPupil() {
        return this.pupilRepository.fetchAllPupil();
    }
    findById(pupilDto: PupilDto) {
        return this.pupilRepository.findById(pupilDto);
    }
    findByScheduleId(scheduleDto: ScheduleDto) {
        return this.pupilRepository.findByScheduleId(scheduleDto);
    }    
    updateWeightExercise(trainingExerciseDto: TrainingExerciseDto) {
        return this.pupilRepository.updateWeightExercise(trainingExerciseDto);
    }    
    updatePupil(pupilDto: PupilDto) {
        return this.pupilRepository.updatePupil(pupilDto);
    }    
    deletePupil(pupilDto: PupilDto) {
        return this.pupilRepository.deletePupil(pupilDto);
    }
    fetchAllSchedulePupilById(pupilDto: PupilDto) {
        return this.pupilRepository.fetchAllSchedulePupilById(pupilDto);
    }
    fetchAllAssementPupilById(pupilDto: PupilDto) {
        return this.pupilRepository.fetchAllAssementByPupilId(pupilDto);
    }
}
