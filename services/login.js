const MongoLib = require('../lib/mongo');

class LoginService {

    constructor() {
        this.collection = 'registro';
        this.mongoDB = new MongoLib();
    }

    async verifyCredentials(data) {
        let result = "";
        var correctPassword = true;
        try {
            const verify = await this.mongoDB.getUsername(this.collection, data.username);

            if ( verify.isActive == true ) {

                try {
                    var decoded = jwt.verify(verify.password, data.password);
                } catch(err) {
                    correctPassword = false;
                }

                if (correctPassword) {
                    result = "Welcome!!!";
                } else {
                    result = "Wrong Password";
                }

            } else {
                result = "The account is not active";   
            }

        } catch (error) {
            result = "Wrong Username";
        }

        return result;
    }

}

module.exports = LoginService;