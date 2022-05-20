const express = require('express');
const DietasService = require('../services/dietas.js');

function dietaAPI(app) {
    const router = express.Router();
    app.use("/dietas", router);
    const dietasService = new DietasService();

    router.put("/", async function(req, res, next){
        let data = req.body;
        const reqs = isObjEmpty(data);
        
        if (reqs === true){
            data = req.query;
        }

        console.log("╔═════════════════════════");
        console.log("║ Metodo PUT createDieta");

        try {
                const dietaCreated = await dietasService.createDieta(data);
                const dietaSting = dietaCreated.toString();
                const idArray = dietaSting.split(" ");
                const id = idArray[0];

                const findDieta = await dietasService.getDieta(id);

                res.status(200).json({
                    data: dietaCreated,
                    message: 'Dieta creada exitosamente'
                }); 
                console.log('║ Dieta creada exitosamente', findDieta );
                console.log("╚═════════════════════════");
        } catch (error) {
            next(error);
        }
    });


    router.get("/", async function(req, res, next){
        let id  = req.body;
        const reqs = isObjEmpty(id.id);
    
        if (reqs === true){
            id = req.query;
        }

        console.log("╔═════════════════════════");
        console.log("║ Metodo GET getDieta");

        try {
            const dieta = await dietasService.getDieta(id.id);

            const emptyobj = isObjEmpty(dieta);

            if (emptyobj === false){

                res.status(200).json({
                    message: 'Busqueda exitosa',
                    dieta: dieta
                });
                console.log('║ Busqueda exitosa\n', dieta );
                console.log("╚═════════════════════════");
            }
            else{
                res.status(200).json({
                    dieta: dieta,
                    message: 'Busqueda no exitosa, el id no se encuentra registrado'
                });
            }
            console.log('║ Busqueda no exitosa, el id \n║ no se encuentra registrado' );
            console.log("╚═════════════════════════");


        } catch (error) {
            next(error);
        }
    });

    

    router.post("/", async function(req, res, next){
        let  data  = req.body;
        const reqs = isObjEmpty(data);
    
        if (reqs === true){
            data = req.query;
        }


        console.log("╔═════════════════════════");
        console.log("║ Metodo POST updateDieta ");
        const findDieta = await dietasService.getDieta(data.id);
        const emptyObj = isObjEmpty(findDieta);
        if (emptyObj === false){

            try {
                const dietaUpdate = await dietasService.updateDieta(data);
                res.status(200).json({
                    data: dietaUpdate,
                    message: 'Dieta actualizada exitosamente'
                });
                console.log('║ Dieta actualizada exitosamente');
                console.log("╚═════════════════════════");
            
               
            } catch (error) {
                next(error);
    
                res.status(200).json({
                    message: 'Ocurrio un error'
                });
                
            }
        }
        else{
            res.status(200).json({
                message: 'El id no se encuentra registrado'
            });
            console.log('║ Dieta no actualizada, el id \n║ no se encuentra registrado');
            console.log("╚═════════════════════════");
        
        }

    });

    router.delete("/", async function(req, res, next){
        let id = req.body;

        console.log("╔═════════════════════════");
        console.log("║ Metodo DELETE deleteDieta ");

        const reqs = isObjEmpty(id);
    
        if (reqs === true){
             id = req.query;
        }

        const findDieta = await dietasService.getDieta(id);
        const emptyobj = isObjEmpty(findDieta);

        if (emptyobj === false){
            
            try {
                const dietaDelete = await dietasService.deleteDieta(id.id);
                res.status(200).json({
                    id: dietaDelete,
                    message: 'Dieta eliminada '
                });
                console.log('║ Dieta eliminada exitosamente');
                console.log("╚═════════════════════════");
            } catch (error) {
                next(error);
            }
        }
        else{
            res.status(200).json({
                message: 'Dieta no eliminada, el id no se encuentra registrado. '
            });
            console.log('║ Dieta no eliminada, el id \n║ no se encuentra registrado.');
            console.log("╚═════════════════════════");
        }


    });

    router.get("/all", async function(req, res, next){

        console.log("╔═════════════════════════");
        console.log("║ Metodo GET getTodos");

        const dietas = await dietasService.getTodos();
        res.status(200).json({
            dieta: dietas,
            message: 'Busqueda exitosa'
        });
        console.log('║ Busqueda exitosa. \n', dietas);
        console.log("╚═════════════════════════");
    });

    function isObjEmpty(obj) {
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) return false;
        }
      
        return true;
      }

}

module.exports = dietaAPI;