import { Body, Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupAuthDto } from 'src/dtos/signup-auth.dto';
import { UserDto } from 'src/dtos/user.dto';
import { SignupService } from 'src/services/signup/signup.service';
import { RecoverUser } from '../auth/autenticate/recover-user-id';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleUserGuard } from '../auth/role-user/role-user.guard';
import { Role } from '../auth/role.decorator';

@Controller('/')
export class SignupController {
   
    constructor(private signupService: SignupService, private recoverUser: RecoverUser) {}

    @Post("firstaccess")
    async signupAuthMembership(@Body() signupAuthDto: SignupAuthDto){

        return {token: await this.signupService.signupAuthFirstAccess(signupAuthDto)};
    }

    @Role('user')
    @UseGuards(JwtGuard, RoleUserGuard)
    @Post("signup")
    async signupUser(@Body() userDto: UserDto, @Req() req: Request){        
        
        userDto.membershipFk = this.recoverUser.recoverUserIdByAccessToken(req);
        return await this.signupService.createUser(userDto);
    }
}
