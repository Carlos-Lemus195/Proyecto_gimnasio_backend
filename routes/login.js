const express = require('express');
const LoginService = require('../services/Login');


function loginAPI(app) {
    const router = express.Router();
    app.use("/login", router);
    const loginService = new LoginService();

    router.get("/", async function(req, res, next){
        const { body: data } = req;
        try {
            
            const loginVerified = await loginService.verifyCredentials(data);
            res.status(200).json({
                message: loginVerified
            });

        } catch(err) {
            res.status(200).json({
                message: 'Unable to verify the credentials'
            });
            next(err);
        }
    });

}

module.exports = loginAPI;