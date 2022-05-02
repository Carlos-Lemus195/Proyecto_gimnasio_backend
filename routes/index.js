const luhnAPI = require('./luhn.js')
const registroAPI = require('./registro.js')
const loginAPI = require('./login.js')

function  controllers(app) {
    luhnAPI(app);
    registroAPI(app);
    loginAPI(app);
}

module.exports = controllers;