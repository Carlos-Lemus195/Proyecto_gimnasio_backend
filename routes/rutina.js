const express = require('express');
const RutinaService = require('../services/rutina');

function rutinaAPI(app) {
    const router = express.Router();
    app.use("/rutina", router);
    const rutinaService = new RutinaService();

    router.get("/", async function(req, res, next){
        const { body: datos } = req;
        console.log(datos);
        try {
            const result = await rutinaService.getRutina(datos.id);
            res.status(200).json({
                rutina: result,
                message: 'rutina requested successfully'
            });
        } catch (error) {
            next(error);
        }
    });

    router.get("/all", async function(req, res, next){
        try {
            const rutinas = await rutinaService.getRutinas();
            res.status(200).json({
                rutinas: rutinas,
                message: 'rutina collection requested successfully'
            });
        } catch (error) {
            next(error);
        }
    });

    router.put("/", async function(req, res, next){
        const { body: rutina } = req;
        try {
            const rutinaCreated = await rutinaService.createRutina(rutina);
            res.status(200).json({
                data: rutinaCreated,
                message: 'rutina created succesfully'
            });
        } catch (error) {
            next(error);
        }
    });

    router.post("/", async function(req, res, next){
        const { query: data } = req;
        console.log("query", data);
        try {
                const rutinaUpdate = await rutinaService.updateRutina(data);
                res.status(200).json({
                    data: rutinaUpdate,
                    message: 'rutina succesfully updated'
                });
        } catch (error) {
            next(error);
        }
    });

    router.delete("/", async function(req, res, next){
        const { body: datos } = req;
        console.log(datos);
        try {
            const rutinaDelete = await rutinaService.deleteRutina(datos.id);
            res.status(200).json({
                rutina: rutinaDelete,
                message: 'rutina succesfully deleted'
            });
        } catch (error) {
            next(error);
        }
    });

}

module.exports = rutinaAPI;