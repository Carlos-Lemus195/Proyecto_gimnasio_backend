const MongoLib = require('../lib/mongo');

class RegistroService {

    constructor() {
        this.collection = 'Empleados';
        this.mongoDB = new MongoLib();
    }

    async createRegistro(data) {
        const registroCreated = await this.mongoDB.create(this.collection, data);
        return registroCreated;
    }

}

module.exports = RegistroService;