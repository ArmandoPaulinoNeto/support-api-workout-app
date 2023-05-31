import { Injectable } from '@nestjs/common';
import { SigninAuthDto } from 'src/dtos/signin-auth.dto';
import { AccessRepository } from 'src/repositories/access.repository';

@Injectable()
export class SigninService {
    
    constructor(private accessRepository: AccessRepository){}

    signinPerson(signinAuthDto:SigninAuthDto){

        return this.accessRepository.signinPerson(signinAuthDto);
    }
}
