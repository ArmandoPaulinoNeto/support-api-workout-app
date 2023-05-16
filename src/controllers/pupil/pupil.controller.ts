import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleUserGuard } from '../auth/role-user/role-user.guard';
import { Role } from '../auth/role.decorator';
import { PupilService } from 'src/services/pupil/pupil.service';
import { PupilDto } from 'src/dtos/pupil.dto';

@Controller('pupil')
export class PupilController {

    constructor(private pupilService: PupilService){}    

    @Role("administrator" || "teacher")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Get("/fetch-all")
    fetchAllPupil(){
        return this.pupilService.fetchAllPupil();
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
