const MongoLib = require('../lib/mongo');
const jwt = require('jsonwebtoken');

class LoginService {

    constructor() {
        this.collection = 'Empleados';
        this.mongoDB = new MongoLib();
    }

    async verifyCredentials(data) {
        let result = "";
        var correctPassword = true;
        
        const verify = await this.mongoDB.getEmail(this.collection, data.email);

        if ( verify != null ) {

            try {
                var decoded = jwt.verify(verify.password, data.password);
            } catch(err) {
                correctPassword = false;
            }

            if (correctPassword) {
                result = "Welcome " + verify.nombreCompleto + "!!!";
            } else {
                result = "Contraseña Incorrecta";
            }

        } else {
            result = "Email no asociado";   
        }
        return result;
    }
}

module.exports = LoginService;