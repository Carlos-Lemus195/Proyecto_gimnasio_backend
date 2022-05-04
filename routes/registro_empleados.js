const express = require('express');
const RegistroService = require('../services/registro_empleados');
const jwt = require('jsonwebtoken');


function registroAPI(app) {
    const router = express.Router();
    app.use("/registro_empleados", router);
    const registroService = new RegistroService();

    router.put("/", async function(req, res, next){
        const { body: datos } = req;

        try {
            var securePassword = jwt.sign({ foo: 'bar' }, datos.password);
            const remainingdata = { "password": securePassword };
            const data = Object.assign(datos,remainingdata);
            const registroCreated = await registroService.createRegistro(data);
            res.status(200).json({
                data: registroCreated,
                message: 'data succesfully inserted in Empleados'
            });

        } catch(err) {
            res.status(200).json({
                message: 'the data was not inserted in Empleados'
            });
            next(err);
        }
    });

}

module.exports = registroAPI;