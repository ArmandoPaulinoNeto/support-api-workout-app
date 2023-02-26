import { AppDataSource } from "src/config/data-source";
import { SigninAuthDto } from "src/dtos/signin-auth.dto";
import { UserDto } from "src/dtos/user.dto";
import { User } from "src/entities/user.entity";
import { EncriptorBcript } from "src/util/encriptor-bcript";
import { v4 } from "uuid";

export class UserRepository{
    
    encriptor = new EncriptorBcript();

    async createUser(userDto: UserDto): Promise<User>{        
       
        const { membershipFk, username, email, password } = userDto;
        
        const newUser = new User();

        newUser.id = v4();
        newUser.username = username;
        newUser.email = email;
        newUser.password = this.encriptor.encriptorPassword(password);        
        newUser.membership_fk = membershipFk;

        AppDataSource.createQueryBuilder()
                        .insert()
                        .into("user")
                        .values(newUser)
                        .execute();
                        
        return newUser;
    }

    async signinUser(signupAuthDto: SigninAuthDto): Promise<User>{
        
        signupAuthDto.password = this.encriptor.encriptorPassword(signupAuthDto.password);

        const {emailOrUsername, password} = signupAuthDto;
        
        return await AppDataSource.createQueryBuilder()
                                    .select()
                                    .from("user", "u")
                                    .where("u.email = :email", { email: emailOrUsername })
                                    .orWhere("u.username = :username", { username: emailOrUsername })
                                    .andWhere("u.password = :password", { password: password })
                                    .execute();
    }  
}