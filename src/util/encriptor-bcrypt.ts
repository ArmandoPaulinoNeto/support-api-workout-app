import  * as bcrypt  from "bcrypt";

const salt = 10;
export class EncriptorBcrypt{

    async generatorHash(password: string){
        return await bcrypt.hashSync(password, salt); 
    }

    async comparePasswordWithHash(password: string, hash: string){
        return await bcrypt.compareSync(password, hash);
    }
}