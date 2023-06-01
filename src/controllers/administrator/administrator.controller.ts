import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { NoticeDto } from 'src/dtos/notice.dto';
import { AdministratorService } from 'src/services/administrator/administrator.service';
import { RecoverIdToken } from '../auth/autenticate/recover-id-token';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleUserGuard } from '../auth/role-user/role-user.guard';
import { Role } from '../auth/role.decorator';
import { DataTeacherDto } from 'src/dtos/data-teacher.dto';
import { ExerciseDto } from 'src/dtos/exercise.dto';
import { AssessmentDto } from 'src/dtos/assessment.dto';

@Controller('administrator')
export class AdministratorController {

    constructor(private administratorService: AdministratorService, private recoverIdToken: RecoverIdToken){}

    @Role("administrator")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/signup/teacher")
    createTeacher(@Body() dataTeacherDto: DataTeacherDto){
        return this.administratorService.createTeacher(dataTeacherDto);
    }

    @Role("administrator")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Get("/fetch-all/teacher")
    fetchAllTeacher(){
        return this.administratorService.fetchAllTeacher();
    }
        
    @Role("administrator")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/signup/exercise")
    createExercise(@Body() exerciseDto: ExerciseDto){
        return this.administratorService.createExercise(exerciseDto);
    }
    
    @Role("administrator")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Get("/fetch-all/exercise")
    fetchAllExercise(){
        return this.administratorService.fetchAllExercise();
    }

    @Role("administrator")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/signup/notice")
    createNotice(@Body() noticeDto: NoticeDto, @Req() req: Request){
        noticeDto.administratorFK = this.recoverIdToken.recoverUserIdByAccessToken(req);
        return this.administratorService.createNotice(noticeDto);
    }

    @Role("administrator")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/signup/assessment")
    createAssessment(@Body() assessmentDto: AssessmentDto){        
        return this.administratorService.createAssessment(assessmentDto);
    }
}
