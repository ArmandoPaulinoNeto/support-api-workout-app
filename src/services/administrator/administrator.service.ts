import { Injectable } from '@nestjs/common';
import { AdministratorDto } from 'src/dtos/administrator.dto';
import { NoticeDto } from 'src/dtos/notice.dto';
import { ProfessorDto } from 'src/dtos/professor.dto';
import { PupilDto } from 'src/dtos/pupil.dto';
import { AdministratorRepository } from 'src/repositories/administrator.repository';
import { PupilRepository } from 'src/repositories/pupil.repository';

@Injectable()
export class AdministratorService {

    constructor(private administratorRepository: AdministratorRepository, private pupilRepository: PupilRepository){}

    getDataHome(administratorDto: AdministratorDto){
        return this.pupilRepository.getDataHome(administratorDto);
    }
   
    createNotice(noticeDto: NoticeDto) {
        return this.administratorRepository.createNotice(noticeDto);
    }

     createProfessor(professorDto: ProfessorDto) {
        throw new Error('Method not implemented.');
    }
    
}
