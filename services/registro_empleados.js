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

    async getRegistro() {
        const registro = await this.mongoDB.getTodos(this.collection);
        console.log('empleado from service', registro);
        return registro || {};
    }
    async updateRegistro(data) {
        const registroUpdated = await this.mongoDB.updateEmpleado(this.collection, data.id, data);
        console.log('empleado Updated', registroUpdated);
        return registroUpdated || {};
    }

    async deleteRegistro(id) {
        const registroDeleted = await this.mongoDB.delete(this.collection, id);
        console.log('empleado deleted', registroDeleted);
        return registroDeleted || {};
    }


}

module.exports = RegistroService;