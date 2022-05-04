const express = require('express');
const LuhnService = require('../services/luhn');

function luhnAPI(app) {
    const router = express.Router();
    app.use("/luhn", router);
    const luhnService = new LuhnService();

    router.get("/", async function(req, res, next){
        const { query: luhn } = req;
        try {
            const luhn1 = await luhnService.getLuhn(luhn.luhn);
            res.status(200).json({
                luhn: luhn1,
                message: 'luhn requested'
            });
        } catch (error) {
            next(error);
        }
    });

    router.put("/", async function(req, res, next){
        const { body: number } = req;
        try {
            const isValid = await isValidNumberCreditCard(number);
            if (isValid) {
                const luhnCreated = await luhnService.createLuhn(number);
                res.status(200).json({
                    data: luhnCreated,
                    message: 'luhn created succesfully'
                });
            } else {
                res.status(200).json({
                    message: 'the credit card is invalid'
                });
            }
        } catch (error) {
            next(error);
        }
    });

    router.post("/", async function(req, res, next){
        const { query: number } = req;
        console.log("query",number);
        const isValid = await isValidNumberCreditCard(number.number);
        try {
            if (isValid) {
                const luhnUpdate = await luhnService.updateLuhn(number);
                res.status(200).json({
                    data: luhnUpdate,
                    message: 'luhn succesfully updated'
                });
            } else {
                res.status(200).json({
                    message: 'the credit card is invalid'
                });
            }
        } catch (error) {
            next(error);
        }
    });

    router.delete("/", async function(req, res, next){
        const { query: luhn } = req;
        try {
            const luhnDelete = await luhnService.deleteLuhn(luhn.id);
            res.status(200).json({
                luhn: luhnDelete,
                message: 'luhn succesfully deleted'
            });
        } catch (error) {
            next(error);
        }
    });

    function split_numbers(n) {
        return new Promise((resolve) => {
            if (n.number) {
                resolve((n.number + '').split('').map((i) => { return Number(i); }));
            } else {
                resolve((n + '').split('').map((i) => { return Number(i); }));
            }
        });
    }

    async function luhn(n) {
        const number_splitted = await split_numbers(n);

        let result;
        let results = [];

        for (let i=(number_splitted.length-1); i!=-1; i--) {
            const even_number = i%2;
            if (even_number == 0) {
                result = number_splitted[i] * 1;
                results.push(result);
                
            } else {
                result = number_splitted[i] * 2;
                if (result > 9) {
                    result = await isGraterThanNine(result);
                }
                results.push(result);
            }

        }
        return results;
    }

    async function isGraterThanNine(result) {
        const value = await split_numbers(result);
        let plus = 0;
        for (let i=0; i<value.length; i++) {
            plus = plus + parseInt(value[i].toString(),10);
        }
        return plus;
    }

    async function isValidNumberCreditCard(n) {
        const results = await luhn(n);
        let isValid = false;
        let plus = 0;
        results.forEach(element => {
            plus = plus + element;
        });
        base = plus%10;
        if (base == 0) {
            isValid = true;
        } else {
            isValid = false;
        }
        return isValid;
    }

}

module.exports = luhnAPI;