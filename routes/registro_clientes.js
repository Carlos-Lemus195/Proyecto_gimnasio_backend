const express = require('express');
const RegistroService = require('../services/registro_clientes');
const nodemailer = require('nodemailer');



function registroAPI(app) {
    const router = express.Router();
    app.use("/registro_clientes", router);
    const registroService = new RegistroService();

    router.put("/", async function(req, res, next){
        const { query: datos } = req;
        try {
            const remainingdata = { "mensualidad": 250, "moroso": "no", "montoMora": 0, "estado": "activo"};
            const data = Object.assign(datos,remainingdata);
            const registroCreated = await registroService.createRegistro(data);
            res.status(200).json({
                data: registroCreated,
                message: 'data succesfully inserted in Clientes'
            });

        } catch(err) {
            res.status(200).json({
                message: 'the data was not inserted in Clientes'
            });
            next(err);
        }
    });

}


async function sendEmail(data, token) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'carlos.nodeemailer@gmail.com',
          pass: 'Nodeemailer195'
        }
    });

    var mailOptions = {
        from: 'carlos.nodeemailer@gmail.com',
        to: data.email,
        subject: 'This is your TOKEN!!!!',
        text: 'Welcome to our family ' + data.nombre + '!!!! \nThis is your Token: ' + token
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(200).json({
            message: 'There was an error sending the Token to ' + data.email
            });
        } else {
          console.log('Email sent');
        }
    });
}

module.exports = registroAPI;