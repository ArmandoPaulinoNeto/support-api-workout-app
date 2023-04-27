import { Injectable } from '@nestjs/common';
import { DataPupilDto } from 'src/dtos/data-pupil.dto';
import { PupilRepository } from 'src/repositories/pupil.repository';
 
@Injectable()
export class SignupService {
    
    constructor(private pupilRepository: PupilRepository){}

    createPupil(dataPupilDto: DataPupilDto) {
        return this.pupilRepository.createPupil(dataPupilDto)
    }
}
