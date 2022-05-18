const MongoLib = require('../lib/mongo');

class PagoPlataformaService {

    constructor() {
        this.collection = 'Clientes';
        this.mongoDB = new MongoLib();
    }

    async realizarPago(email) {
        const data = await this.mongoDB.getEmail(this.collection, email);
        let year = parseInt(data.fechaPago.slice(0,4));
        let month = parseInt(data.fechaPago.slice(5,7));
        let day = parseInt(data.fechaPago.slice(8,10));

        if (month == 12) { year += 1; month = 1; } else { month += 1; }
        const newFechaPago = year.toString() + '-' + (month).toString() + '-' + day.toString();

        const realizarPago = await this.mongoDB.realizarPago(this.collection, email, newFechaPago);
        return realizarPago;
    }

}

module.exports = PagoPlataformaService;