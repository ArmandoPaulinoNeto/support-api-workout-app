import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/controllers/auth/jwt.guard';
import { RoleUserGuard } from 'src/controllers/auth/role-user/role-user.guard';
import { Role } from 'src/controllers/auth/role.decorator';
import { SigninAuthDto } from 'src/dtos/signin-auth.dto';
import { SigninService } from 'src/services/signin/signin.service';

@Controller('signin/')
export class SigninController {
    
    constructor(private signinService: SigninService) {}
    
    @Post('access')
    async signin(@Body() signinAuthDto: SigninAuthDto){
        
        return { token: await this.signinService.signinPerson(signinAuthDto) };
    }

    @Role('user')
    @UseGuards(JwtGuard, RoleUserGuard)
    @Get('get-user')
    getUser(@Body() userId){        
        return this.signinService.getUserById(userId);
    }
}
