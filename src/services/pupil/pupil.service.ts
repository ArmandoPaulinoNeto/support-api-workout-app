import { Injectable } from '@nestjs/common';
import { PupilDto } from 'src/dtos/pupil.dto';
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

    updatePupil(pupilDto: PupilDto) {
        return this.pupilRepository.updatePupil(pupilDto);
    }

    deletePupil(pupilDto: PupilDto) {
        return this.pupilRepository.deletePupil(pupilDto);
    }
}
