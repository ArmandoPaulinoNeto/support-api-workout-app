const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

export class EncriptorBcript{

    encriptorPassword(password: string){
        return bcrypt.hashSync(password, salt);
    }

    comperePassword(password: string, userPassword: string){
        return bcrypt.hashSync(password, salt) == userPassword;
    }
}