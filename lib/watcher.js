const { MongoClient } = require('mongodb');
const stream = require('stream');
const { config } = require("../config");
const { socket } = require('./socket-server');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}.lkddp.mongodb.net/test`;

async function main() {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();

        const pipeline = [
            {
                '$match': {
                    'operationType': 'update'
                }
            }
        ]

        await monitorListingsUsingEventEmitter(client, pipeline);

    } finally {

        await client.close();
    }
}

main().catch(console.error);

async function monitorListingsUsingEventEmitter(client, pipeline = []) {
    const collection = client.db(DB_NAME).collection("Clientes");

    const changeStream = collection.watch(pipeline);

    try {
        while (await changeStream.hasNext()) {
            let data = await changeStream.next()
            socket.io.emit('friend', data.updateDescription.updatedFields);
        }
    } catch (error) {
        if (changeStream.closed) {
            console.log("Change Stream Closed.");
        } else {
            throw error;
        }
    }
}