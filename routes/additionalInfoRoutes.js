'use strict'

const express = require('express');
const additionalInfoController = require('../controllers/addInfoController');
const router = express.Router();

const { getPatientsFromController, deleteAddInfoForUserFromController, addAdditionalInfoFromController, 
    searchPatientsFromController, getAdditionalInfoFromController, updateAdditionalInfoFromController } = additionalInfoController;

router.get('/patients/:id', getPatientsFromController);
router.post('/patients/:id', searchPatientsFromController);

router.post('/patient', addAdditionalInfoFromController);
router.put('/patient/:id', updateAdditionalInfoFromController);
router.delete('/patient/:id', deleteAddInfoForUserFromController);

router.get('/addinfo/:id', getAdditionalInfoFromController);

module.exports = {
    routes: router
}