import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleUserGuard } from '../auth/role-user/role-user.guard';
import { Role } from '../auth/role.decorator';
import { PupilService } from 'src/services/pupil/pupil.service';

@Controller('pupil/')
export class PupilController {

    constructor(private pupilService: PupilService){}    

    @Role("administrator" || "teacher")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Get("fetch-all")
    fetchAllTeacher(){
        return this.pupilService.fetchAllPupil();
    }
}
