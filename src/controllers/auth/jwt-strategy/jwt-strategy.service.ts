import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
require('dotenv/config');

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy){
    
    constructor(){
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: process.env.SECRET_KEY,
            }
        );
    }

    async validate(payload){
        return payload;
    }
}
