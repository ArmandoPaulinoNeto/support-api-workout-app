import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LoggedDto } from "src/dtos/logged.dto";
import { LoadingDataRepository } from "src/repositories/loading-data.repository";
import { JwtGuard } from "../auth/jwt.guard";
import { RoleUserGuard } from "../auth/role-user/role-user.guard";
import { Role } from "../auth/role.decorator";

@Controller("loading")
export class LoadingDataController{

    constructor(private loadingDataRepository: LoadingDataRepository){}
    
    @Role("administrator" || "teacher")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("/data")
    getDataHome(@Body() loggedDto: LoggedDto){
        return this.loadingDataRepository.getDataHome(loggedDto);
    }
}