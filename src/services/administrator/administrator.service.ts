import { Injectable } from '@nestjs/common';
import { AssessmentDto } from 'src/dtos/assessment.dto';
import { DataTeacherDto } from 'src/dtos/data-teacher.dto';
import { ExerciseDto } from 'src/dtos/exercise.dto';
import { NoticeDto } from 'src/dtos/notice.dto';
import { AdministratorRepository } from 'src/repositories/administrator.repository';

@Injectable()
export class AdministratorService {
    
    constructor(private administratorRepository: AdministratorRepository){}
    
    createTeacher(dataTeacherDto: DataTeacherDto) {
        return this.administratorRepository.createTeacher(dataTeacherDto);
    }
    
    fetchAllTeacher() {
        return this.administratorRepository.fetchAllTeacher();
    }
    
    createNotice(noticeDto: NoticeDto) {
        return this.administratorRepository.createNotice(noticeDto);
    }
    
    createExercise(exerciseDto: ExerciseDto) {
        return this.administratorRepository.createExercise(exerciseDto);
    }
    createAssessment(assessmentDto: AssessmentDto) {
        return this.administratorRepository.createAssessment(assessmentDto);
    }
    
    fetchAllExercise() {
        return this.administratorRepository.fetchAllExercise();
    }
    
}
