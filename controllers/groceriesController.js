'use strict';

const groceriesData = require('../data/groceries/index');

const getGroceriesFromController = async(req, res, next) => {
    try{
        const groceries = await groceriesData.getGroceries();
        res.send(groceries);        
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getGroceryFromController = async(req, res, next) => {
    try{
        const groceryIdFromReq = req.params.id;
        const OneGrocery = await groceriesData.getGroceryById(groceryIdFromReq);
        res.send(OneGrocery);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getGroceriesByNameFromController = async(req, res, next) => {
    try{
        const groceriesNameFromReq = req.params.name;
        const groceries = await groceriesData.getGroceriesByName(groceriesNameFromReq);
        res.send(groceries);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const addGroceryFromController = async(req, res, next) => {
    try{
        const data = req.body;
        const createdGrocery = await groceriesData.createGrocery(data);
        res.send(createdGrocery);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const updateGroceryFromController = async(req, res, next) => {
    try{
        const groceryId = req.params.id;
        const data = req.body;
        const updatedGrocery = await groceriesData.updateGrocery(groceryId, data);
        res.send(updatedGrocery);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const deleteGroceryFromController = async(req, res, next) => {
    try{
        const groceryId = req.params.id;
        const deletedGrocery = await groceriesData.deleteGrocery(groceryId);
        res.send(deletedGrocery);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    getGroceriesFromController,
    getGroceryFromController,
    addGroceryFromController,
    updateGroceryFromController,
    deleteGroceryFromController,
    getGroceriesByNameFromController
}