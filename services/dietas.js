const MongoLib = require('../lib/mongo');

class DietasService {

    constructor() {
        this.collection = 'Dietas';
        this.mongoDB = new MongoLib();
    }

    async createDieta(data) {
        console.log(data)
        const dietaCreated = await this.mongoDB.create(this.collection, data);
        return dietaCreated;
    }

    async getDieta(n) {
        const dieta = await this.mongoDB.get(this.collection, n);
        return dieta || {};
    }

    async updateDieta(data) {
        const dietaUpdated = await this.mongoDB.update(this.collection, data);
        return dietaUpdated || {};
    }

    async deleteDieta(id) {
        const dietaDeleted = await this.mongoDB.delete(this.collection, id);
        return dietaDeleted || {};
    }

    async getTodos() {
        const dieta = await this.mongoDB.getTodos(this.collection);
        return dieta || {};
    }

    // async countDieta() {
    //     const count = await this.mongoDB.count(this.collection);
    //     console.log('count', count)
    //     return count;
    // }

    // async findskip(t) {
    //     console.log('t', t)
    //     const findsk = await this.mongoDB.findskip(this.collection, t);
    //     console.log('count', findsk)
    //     return findsk;
    // }

}

module.exports = DietasService;