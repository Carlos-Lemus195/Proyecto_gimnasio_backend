const luhnAPI = require('./luhn.js')
const registroEmpleadosAPI = require('./registro_empleados.js')
const registroClientesAPI = require('./registro_clientes.js')
const loginAPI = require('./login.js')
const verifyEmailAPI = require('./verifyEmail.js')
const rutinaAPI = require('./rutina.js')

function  controllers(app) {
    luhnAPI(app);
    registroEmpleadosAPI(app);
    registroClientesAPI(app);
    loginAPI(app);
    verifyEmailAPI(app);
    rutinaAPI(app);
}

module.exports = controllers;