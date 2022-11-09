'use strict'

const express = require('express');
const dietsController = require('../controllers/dietsController');
const router = express.Router();

const { addDietFromController, getAllDietsController, getDietFromController } = dietsController;

router.post('/diet', addDietFromController);
router.get('/diet/:id', getDietFromController);
router.get('/diets', getAllDietsController);

module.exports = {
    routes: router
}