'use strict'

const express = require('express');
const activitiesController = require('../controllers/activitiesController');
const router = express.Router();

const { getActivitiesFromController } = activitiesController;

router.get('/activities', getActivitiesFromController);

module.exports = {
    routes: router
}