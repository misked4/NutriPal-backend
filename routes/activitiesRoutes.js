'use strict'

const express = require('express');
const activitiesController = require('../controllers/activitiesController');
const router = express.Router();

const { getActivitiesFromController, addActivityFromController } = activitiesController;

router.get('/activities', getActivitiesFromController);
router.post('/activity', addActivityFromController);

module.exports = {
    routes: router
}