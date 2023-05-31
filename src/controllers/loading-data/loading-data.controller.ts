import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LoggedDto } from "src/dtos/logged.dto";
import { LoadingDataRepository } from "src/repositories/loading-data.repository";
import { JwtGuard } from "../auth/jwt.guard";
import { RoleUserGuard } from "../auth/role-user/role-user.guard";
import { Role } from "../auth/role.decorator";

@Controller("loading-data")
export class LoadingDataController{

    constructor(private loadingDataRepository: LoadingDataRepository){}
    
    @Role("administrator")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/administrator")
    getDataHomeAdministrator(@Body() loggedDto: LoggedDto){
        return this.loadingDataRepository.getDataHomeAdministrator(loggedDto);
    }

    @Role("teacher")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/teacher")
    getDataHomeTeacher(@Body() loggedDto: LoggedDto){
        return this.loadingDataRepository.getDataHomeTeacher(loggedDto);
    }

    @Role("pupil")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/pupil")
    getDataHomePupil(@Body() loggedDto: LoggedDto){
        return this.loadingDataRepository.getDataHomePupil(loggedDto);
    }
}