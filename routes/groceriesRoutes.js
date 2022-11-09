'use strict'

const express = require('express');
const groceriesController = require('../controllers/groceriesController');
const router = express.Router();

const {getGroceriesFromController, getGroceryFromController, getGroceriesByNameFromController, addGroceryFromController, updateGroceryFromController, deleteGroceryFromController} = groceriesController;

router.get('/groceries', getGroceriesFromController);
router.get('/grocery/:id', getGroceryFromController);
router.get('/groceries/:name', getGroceriesByNameFromController);
router.post('/grocery', addGroceryFromController);
router.put('/grocery/:id', updateGroceryFromController);
router.delete('/grocery/:id', deleteGroceryFromController);

module.exports = {
    routes: router
}