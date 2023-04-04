import { Body, Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AccessDto } from 'src/dtos/access.dto';
import { PupilDto } from 'src/dtos/pupil.dto';
import { PupilRepository } from 'src/repositories/pupil.repository';
import { SignupService } from 'src/services/signup/signup.service';
import { RecoverIdToken } from '../auth/autenticate/recover-id-token';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleUserGuard } from '../auth/role-user/role-user.guard';
import { Role } from '../auth/role.decorator';

@Controller('signup')
export class SignupController {
   
    constructor(private signupService: SignupService){}
    
    @Role("administrator" || "professor")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/pupil")
    createPupil(@Body() pupilDto: PupilDto){
        return this.signupService.createPupil(pupilDto);
    }
}
