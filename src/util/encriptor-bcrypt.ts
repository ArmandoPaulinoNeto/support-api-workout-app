import  * as bcrypt  from "bcrypt";

const salt = 10;
export class EncriptorBcrypt{

    async generatorHash(password: String){
        return await bcrypt.hashSync(password, salt); 
    }

    async comparePasswordWithHash(password: String, hash: String){
        return await bcrypt.compareSync(password, hash);
    }
}