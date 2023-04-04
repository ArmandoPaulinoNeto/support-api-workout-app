import { Injectable } from '@nestjs/common';
import { AccessDto } from 'src/dtos/access.dto';
import { PupilDto } from 'src/dtos/pupil.dto';
import { PupilRepository } from 'src/repositories/pupil.repository';
 
@Injectable()
export class SignupService {
    
    constructor(private pupilRepository: PupilRepository){}

    createPupil(pupilDto: PupilDto) {
        return this.pupilRepository.createPupil(pupilDto)
    }
}
