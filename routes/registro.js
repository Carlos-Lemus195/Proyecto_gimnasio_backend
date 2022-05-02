const express = require('express');
const RegistroService = require('../services/registro');
const nodemailer = require('nodemailer');



function registroAPI(app) {
    const router = express.Router();
    app.use("/registro", router);
    const registroService = new RegistroService();

    router.put("/", async function(req, res, next){
        const { body: datos } = req;

        try {
            const remainingdata = { "isActive": false, "password": securePassword };
            const data = Object.assign(datos,remainingdata);
            const correo = await sendEmail(data, token);
            const registroCreated = await registroService.createRegistro(data);
            res.status(200).json({
                data: registroCreated,
                message: 'data succesfully inserted in registro'
            });

        } catch(err) {
            res.status(200).json({
                message: 'the data was not inserted in registro'
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