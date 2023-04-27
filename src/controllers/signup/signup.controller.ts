import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DataPupilDto } from 'src/dtos/data-pupil.dto';
import { SignupService } from 'src/services/signup/signup.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleUserGuard } from '../auth/role-user/role-user.guard';
import { Role } from '../auth/role.decorator';
import { DataTeacherDto } from 'src/dtos/data-teacher.dto';

@Controller('signup')
export class SignupController {
   
    constructor(private signupService: SignupService){}

    @Role("administrator" || "professor")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/pupil")
    createPupil(@Body() dataPupilDto: DataPupilDto){
        return this.signupService.createPupil(dataPupilDto);
    }
}
