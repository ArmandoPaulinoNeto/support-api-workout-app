import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AppDataSource } from "src/config/data-source";
import { AccessTokenGenerator } from "src/controllers/auth/autenticate/access-token-generator";
import { SignupAuthDto } from "src/dtos/signup-auth.dto";
import { Membership } from "src/entities/Membership.entity";
require('dotenv/config')

@Injectable()
export class MembershipRepository{
    
    constructor(private accessTokenGenerator: AccessTokenGenerator){}

    async authMembershipByPlateCPF(signupAuthDto: SignupAuthDto) : Promise<String>{
        
        const {plate, cpf} = signupAuthDto;
        
        try {
            const membership = await AppDataSource.createQueryBuilder()
                                    .select("m.id, m.name, a.role")
                                    .from("membership", "m")
                                    .innerJoinAndSelect("access_profile", "a", "a.id = m.access_profile_fk")
                                    .where("m.plate = :plate", { plate: plate })
                                    .andWhere("m.cpf = :cpf", { cpf: cpf })
                                    .execute();
    
            if(JSON.stringify(membership) !== '{}' && JSON.stringify(membership) !== '[]'){
    
                var sub = membership[0].id;
                var name = membership[0].name;
                var role = membership[0].role;
                var exp = "300s";
                console.log(membership[0]);
                console.log(process.env.SECRET_KEY);
                return this.accessTokenGenerator.AccessToken(sub, name, role, exp);
            }
            return 'Usuário não encontrado!';
        } catch (error) {
            throw "Erro ao tentar consultar usuário!"
        }
    }    
}