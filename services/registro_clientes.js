const MongoLib = require('../lib/mongo');

class RegistroService {

    constructor() {
        this.collection = 'Clientes';
        this.mongoDB = new MongoLib();
    }

    async createRegistro(data) {
        const registroCreated = await this.mongoDB.create(this.collection, data);
        return registroCreated;
    }

    async getClientes() {
        const clientes = await this.mongoDB.getTodos(this.collection);
        return clientes || {};
    }

    async updateCliente(data) {
        const clienteUpdated = await this.mongoDB.updateCliente(this.collection, data.id, data);
        console.log('cliente Updated', clienteUpdated);
        return clienteUpdated || {};
    }

    async deleteCliente(id) {
        const clienteDeleted = await this.mongoDB.delete(this.collection, id);
        console.log('Cliente deleted', clienteDeleted);
        return clienteDeleted || {};
    }

}

module.exports = RegistroService;