'use strict';

const additionalData = require('../data/additional_info/index');

const getPatientsFromController = async(req, res, next) => {
    try{
        const userIdFromReq = req.params.id;
        const Patients = await additionalData.getPatients(userIdFromReq);
        if(!Patients.length)
        {
            res.status(404).send("Not found");
        }
        else res.send(Patients);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const deleteAddInfoForUserFromController = async(req, res, next) => {
    try{
        const infoIdFromReq = req.params.id;
        const deletedUser = await additionalData.deleteAddInfo(infoIdFromReq);
        res.send(deletedUser);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const addAdditionalInfoFromController = async(req, res, next) => {
    try{
        const data = req.body;
        const additionalInfo = await additionalData.addAdditionalInfo(data);
        res.send(additionalInfo);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const searchPatientsFromController = async(req, res, next) => {
    try{
        const userIdFromReq = req.params.id;
        const wordFromReq = req.query.search;
        const Patients = await additionalData.searchPatients(userIdFromReq, wordFromReq);
        if(!Patients.length)
        {
            res.status(404).send("Not found");
        }
        else res.send(Patients);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getAdditionalInfoFromController = async(req, res, next) => {
    try{
        const id = req.params.id;
        const addInfo = await additionalData.getAdditionalInfo(id);
        if(!addInfo.length)
        {
            res.status(404).send("Not found");
        }
        else res.send(addInfo);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const updateAdditionalInfoFromController = async(req, res, next) => {
    try{
        const addInfoId = req.params.id;
        const data = req.body;
        const addInfo = await additionalData.updateAdditionalInfo(addInfoId, data);
        res.send(addInfo);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    getPatientsFromController,
    deleteAddInfoForUserFromController,
    addAdditionalInfoFromController,
    searchPatientsFromController,
    getAdditionalInfoFromController,
    updateAdditionalInfoFromController
}