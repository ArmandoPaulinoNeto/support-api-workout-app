import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleUserGuard } from '../auth/role-user/role-user.guard';
import { Role } from '../auth/role.decorator';
import { TrainingService } from 'src/services/training/administrator.service';

@Controller('training')
export class TrainingController {

    constructor(private trainingService: TrainingService){}

    @Role("administrator" || "professor")
    @UseGuards(JwtGuard, RoleUserGuard)
    @Get("/fetch-all")
    fetchAllTraining(){
        return this.trainingService.fetchAllTraining();
    }
}
