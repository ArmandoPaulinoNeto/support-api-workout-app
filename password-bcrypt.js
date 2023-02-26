const bcrypt = require('bcrypt');

const saltRounds = 10;
const password = process.argv.slice(2)[0];

bcrypt.genSalt(saltRounds, function(error, salt){
    bcrypt.hash(password, salt, function(error, hash){
        console.log(hash);
    });
});