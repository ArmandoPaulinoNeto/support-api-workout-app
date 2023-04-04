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
                                                .select("a.email, a.password, p.role, aa.id")
                                                .from("access", "a")
                                                .innerJoinAndSelect("profile", "p", "p.id = a.profile_fk")
                                                .innerJoinAndSelect("administrator", "aa", "aa.access_fk = a.id")
                                                .where("a.email = :email", { email: email })
                                                .execute();
            
            if(JSON.stringify(access) != '{}' && JSON.stringify(access) != '[]'){
                
                if(await this.encriptorBcrypt.comparePasswordWithHash(password, access[0].password)){
                    var sub = access[0].id;
                    var accessEmail = access[0].email;
                    var role = access[0].role;
                    var exp = "300s";
                    
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