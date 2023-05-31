import { Injectable } from "@nestjs/common";
import { AppDataSource } from "src/config/data-source";
import { AccessTokenGenerator } from "src/controllers/auth/autenticate/access-token-generator";
import { SigninAuthDto } from "src/dtos/signin-auth.dto";
import { v4 } from "uuid";
import { EncriptorBcrypt } from "src/util/encriptor-bcrypt";
import { Access } from "src/entities/access.entity";
import { AccessDto } from "src/dtos/access.dto";

require("dotenv/config");
@Injectable()
export class AccessRepository{
    
    constructor(private accessTokenGenerator: AccessTokenGenerator, private encriptorBcrypt: EncriptorBcrypt){}

    async createUser(accessDto: AccessDto): Promise<Access>{        
       
        const { profile, email, password } = accessDto;
        
        const newAccess = new Access();

        newAccess.id = v4();
        newAccess.email = email;
        newAccess.password = await this.encriptorBcrypt.generatorHash(password);        
        newAccess.profile_fk = profile.id;

        AppDataSource.createQueryBuilder()
                        .insert()
                        .into("access")
                        .values(newAccess)
                        .execute();
                        
        return newAccess;
    }

    async signinPerson(signupAuthDto: SigninAuthDto): Promise<String>{
        
        const {email, password} = signupAuthDto;

        try{
            const access = await AppDataSource.createQueryBuilder()
                                                .select("a.email, a.password, p.role, a.id")
                                                .from("access", "a")
                                                .innerJoin("profile", "p", "p.id = a.profile_fk")
                                                .where("a.email = :email", { email: email })
                                                .getRawOne();
            
            if(JSON.stringify(access) != '{}' && JSON.stringify(access) != '[]'){
                
                if(await this.encriptorBcrypt.comparePasswordWithHash(password, access.password)){
                    var logged;
                    if(access.role == "administrator"){
                        logged = await AppDataSource.createQueryBuilder()
                                                        .select("a.id")
                                                        .from("access", "ac")
                                                        .innerJoin("administrator", "a", "a.access_fk = ac.id")
                                                        .where("ac.id = :id", { id: access.id })
                                                        .getRawOne();
                    }else{
                        logged = await AppDataSource.createQueryBuilder()
                                                        .select("r.id")
                                                        .from("access", "ac")
                                                        .innerJoin("person", "p", "p.access_fk = ac.id")
                                                        .innerJoin(access.role, "r", "r.person_fk = p.id")
                                                        .where("ac.id = :id", { id: access.id })
                                                        .getRawOne();
                    }
                    var sub = logged.id;
                    var accessEmail = access.email;
                    var role = access.role;
                    var exp = "3600s";
                    
                    return this.accessTokenGenerator.AccessToken(sub, accessEmail, role, exp);
                }
                return 'Usuário não encontrado!';
            }       

            return 'Usuário não encontrado!';            
        } catch (error) {
            throw "Erro ao tentar consultar usuário!"
        }
    }    
}