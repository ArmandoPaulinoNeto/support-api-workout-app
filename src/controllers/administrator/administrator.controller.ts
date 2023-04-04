import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AdministratorDto } from 'src/dtos/administrator.dto';
import { NoticeDto } from 'src/dtos/notice.dto';
import { ProfessorDto } from 'src/dtos/professor.dto';
import { AdministratorService } from 'src/services/administrator/administrator.service';
import { RecoverIdToken } from '../auth/autenticate/recover-id-token';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleUserGuard } from '../auth/role-user/role-user.guard';
import { Role } from '../auth/role.decorator';

@Controller('administrator')
export class AdministratorController {

    constructor(private administratorService: AdministratorService, private recoverIdToken: RecoverIdToken){}

    @Role("administrator")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/")
    getDataHome(@Body() administratorDto: AdministratorDto){
        return this.administratorService.getDataHome(administratorDto)
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
    @Post("/signup/professor")
    createProfessor(@Body() professorDto: ProfessorDto){
        return this.administratorService.createProfessor(professorDto);
    }
}
