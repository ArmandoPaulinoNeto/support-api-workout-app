import { Injectable } from '@nestjs/common';
import { SignupAuthDto } from 'src/dtos/signup-auth.dto';
import { UserDto } from 'src/dtos/user.dto';
import { MembershipRepository } from 'src/repositories/membership.repository';
import { UserRepository } from 'src/repositories/user.repository';
 
@Injectable()
export class SignupService {
   

    constructor(private userRepository: UserRepository, private membershipRepository:MembershipRepository){}
    
    signupAuthFirstAccess(signupAuthDto: SignupAuthDto) {
        return this.membershipRepository.authMembershipByPlateCPF(signupAuthDto);
    }

    createUser(userDto: UserDto){

        return this.userRepository.createUser(userDto);
    }
}
