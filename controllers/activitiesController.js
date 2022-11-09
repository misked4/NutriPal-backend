'use strict';

const activitiesData = require('../data/activities/index');

const getActivitiesFromController = async(req, res, next) => {
    try{
        const activities = await activitiesData.getActivities();
        res.send(activities);        
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    getActivitiesFromController
}