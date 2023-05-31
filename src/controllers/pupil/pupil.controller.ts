import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleUserGuard } from '../auth/role-user/role-user.guard';
import { Role } from '../auth/role.decorator';
import { PupilService } from 'src/services/pupil/pupil.service';
import { PupilDto } from 'src/dtos/pupil.dto';
import { ScheduleDto } from 'src/dtos/schedule.dto';
import { TrainingExerciseDto } from 'src/dtos/training-exercise.dto';

@Controller('pupil')
export class PupilController {

    constructor(private pupilService: PupilService){}    

    @Role("administrator" || "teacher")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Get("/fetch-all")
    fetchAllPupil(){
        return this.pupilService.fetchAllPupil();
    }

    @Role("pupil")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/fetch-all-schedule-pupil-by-id")
    fetchAllSchedulePupilById(@Body() pupilDto: PupilDto){
        return this.pupilService.fetchAllSchedulePupilById(pupilDto);
    }

    @Role("pupil")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/find-by-schedule-id")
    findByScheduleId(@Body() scheduleDto: ScheduleDto){
        return this.pupilService.findByScheduleId(scheduleDto);
    }

    @Role("pupil")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/update-weight-exercise")
    updateWeightExercise(@Body() trainingExerciseDto: TrainingExerciseDto){
        return this.pupilService.updateWeightExercise(trainingExerciseDto);
    }
    
    @Role("pupil")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/fetch-all-assessment-by-id")
    fetchAllAssessmentPupilById(@Body() pupilDto: PupilDto){
        return this.pupilService.fetchAllAssementPupilById(pupilDto);
    }

    @Role("administrator" || "teacher")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/find-by-id")
    findById(@Body() pupilDto: PupilDto){
        return this.pupilService.findById(pupilDto);
    }

    @Role("administrator" || "teacher")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/update")
    updatePupil(@Body() pupilDto: PupilDto){
        return this.pupilService.updatePupil(pupilDto);
    }

    @Role("administrator" || "teacher")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/delete")
    deletePupil(@Body() pupilDto: PupilDto){
        return this.pupilService.deletePupil(pupilDto);
    }
}
