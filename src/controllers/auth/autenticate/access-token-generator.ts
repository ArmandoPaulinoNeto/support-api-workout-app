import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
require("dotenv/config");

@Injectable()
export class AccessTokenGenerator{
    
    constructor(private jwtService: JwtService){}
    
    async AccessToken(sub: string, name: string, role: string, exp: string){
        
        const payload = {
            "sub": sub,
            "name": name,
            "role": role
        }
        
        return this.jwtService.sign(payload, { secret: process.env.SECRET_KEY, expiresIn: exp });
    }
}