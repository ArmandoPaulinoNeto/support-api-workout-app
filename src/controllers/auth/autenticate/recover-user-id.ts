import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RecoverUser{

    constructor(private jwtService: JwtService){}
    recoverUserIdByAccessToken(req: Request) {

        const token = req.headers['authorization'].split(" ")[1];
        return this.jwtService.decode(token)['sub'];
    }
}