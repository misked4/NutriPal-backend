'use strict';

const dietsData = require('../data/diets/index');


const addDietFromController = async(req, res, next) => {
    try{
        const data = req.body;
        const createdDiet = await dietsData.addDietData(data);
        res.send(createdDiet);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getAllDietsController = async(req, res, next) => {
    try{
        const data = req.body;
        const allDiets = await dietsData.getAllDiets();
        res.send(allDiets);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getDietFromController = async(req, res, next) => {
    try{
        const dietIdFromReq = req.params.id;
        const diet = await dietsData.getDiet(dietIdFromReq);
        res.send(diet);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addDietFromController,
    getAllDietsController,
    getDietFromController
}