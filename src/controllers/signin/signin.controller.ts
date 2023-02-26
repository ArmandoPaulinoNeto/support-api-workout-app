import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/controllers/auth/jwt.guard';
import { RoleUserGuard } from 'src/controllers/auth/role-user/role-user.guard';
import { Role } from 'src/controllers/auth/role.decorator';
import { SigninAuthDto } from 'src/dtos/signin-auth.dto';

@Controller('signin/')
export class SigninController {
    
    constructor() {}

    @Post('consult')
    signin(@Body() signinAuthDto:SigninAuthDto){

        //return {token: this.autenticateService.signinAuth(signinAuthDto)};
    }

    @Role('admin')
    @UseGuards(JwtGuard, RoleUserGuard)
    @Get('find')
    getUser(@Body() credentials){

        const id = credentials.id;
        //return this.autenticateService.findById(id);
    }
}
