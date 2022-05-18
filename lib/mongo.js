const { MongoClient, ObjectId} = require("mongodb");
const stream = require('stream');


const { config } = require("../config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
    
    constructor(){
        this.client = new MongoClient(MONGO_URI, {useNewUrlParser: true});
        this.dbName = DB_NAME;
    }

    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if(err) {
                        reject(err);
                    }
                    resolve(this.client.db(this.dbName));
                });
            });
        }
        return MongoLib.connection;
    }

    create(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data);
        }).then(result => result.insertedId);
    }

    get(collection, id) {
        return this.connect().then(db => {
            const result = db.collection(collection).findOne({ _id: ObjectId(id) });
            return result;
        });
    }

    getRutin(collection, id) {
        return this.connect().then(db => {
            const result = db.collection(collection).find({ id_objetivo: id }).toArray();
            return result;
        });
    }

    getEmail(collection, Email) {
        return this.connect().then(db => {
            const result = db.collection(collection).findOne({ email: Email });
            return result;
        });
    }

    getClientesNoMorosos(collection){
        return this.connect().then(db => {
            const result = db.collection(collection).find({ moroso: 'no' }).toArray();
            return result;
        });  
    }

    delete(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id) });
        }).then(() => id);
    }

    update(collection, data){
        const { id, alimentos, carbohidratos, proteinas, peso, tiempo, nobjetivo } = data;
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: { alimentos, carbohidratos, proteinas, peso, tiempo, nobjetivo } });
        }).then(result => result);
    }

    updateMoroso(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({_id:ObjectId(id)}, { $set: {"moroso": "si", "montoMora": 25, "estado": "inactivo" }  }, { upsert: true });
        }).then(result => result.upsertedId || id);
    }

    updateSucursal(collection, id, data) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({_id:ObjectId(id)}, { $set: {"direccion": data.direccion }  }, { upsert: true });
        }).then(result => result.upsertedId || id);
    }

    updateRutina(collection, id, data) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({_id: ObjectId(id)}, { $set: {"id_rutina": data.idRutina, "id_objetivo": data.idObjetivo, "nivel": data.nivel, "dia": data.dia, "musculo": data.musculo, "ejercicios": data.ejercicios }  }, { upsert: true });
        }).then(result => result.upsertedId || id);
    }


    getTodos(collection){
        return this.connect().then(db => {
            const result = db.collection(collection).find().toArray();
            return result;
        });  
    }

  
    updateEmpleado(collection, id, data) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({_id:ObjectId(id)}, { $set: {"nombreCompleto": data.nombreCompleto,"email": data.email, "telefono": data.telefono }  }, { upsert: true });
        }).then(result => result.upsertedId || id);
    }
}

module.exports = MongoLib;