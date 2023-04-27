import { Injectable } from '@nestjs/common';
import { PupilRepository } from 'src/repositories/pupil.repository';

@Injectable()
export class PupilService {
            
    constructor(private pupilRepository: PupilRepository){}
    
    fetchAllPupil() {
        return this.pupilRepository.fetchAllPupil();
    }    
}
