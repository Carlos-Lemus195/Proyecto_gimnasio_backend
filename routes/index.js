const luhnAPI = require('./luhn.js')
const registroEmpleadosAPI = require('./registro_empleados.js')
const registroClientesAPI = require('./registro_clientes.js')
const loginAPI = require('./login.js')
const dietaAPI = require('./dietas.js')

function  controllers(app) {
    luhnAPI(app);
    registroEmpleadosAPI(app);
    registroClientesAPI(app);
    loginAPI(app);
    dietaAPI(app);
}

module.exports = controllers;