const MongoLib = require('../lib/mongo');
const jwt = require('jsonwebtoken');

class LoginService {

    constructor() {
        this.collection = 'Empleados';
        this.mongoDB = new MongoLib();
    }
    

    async verifyCredentials(data) {
        let result = {};
        var correctPassword = true;
        
        const verify = await this.mongoDB.getEmail(this.collection, data.email);

        if ( verify != null ) {

            try {
                var decoded = jwt.verify(verify.password, data.password);
            } catch(err) {
                correctPassword = false;
            }

            if (correctPassword) {
                result = {message: "Welcome " + verify.nombreCompleto + "!!!", rol: verify.puesto_rol};
            } else {
                result = {message: "Contraseña Incorrecta", rol: null};
            }

        } else {
            result = {message: "Email no asociado", rol:null};
        }
        return result;
    }
}

module.exports = LoginService;