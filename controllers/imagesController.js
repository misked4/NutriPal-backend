'use strict';
const { cloudinary } = require('../data/utils');
const uploadPhotoController = async(req, res, next) => {
    try{
        const filestr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(filestr,{
            upload_preset: 'dev_setups'
        })
        //console.log(uploadedResponse);
        res.send(uploadedResponse);
    }
    catch(error){
        console.log(error);
        res.status(500).json({err: 'Something went wrong'});
    }
}

const getAllPhotos = async(req, res, next) => {
    try{
        const {resources} = await cloudinary.search.expression('folder:dev_setups')
            .sort_by('public_id', 'desc')
            .max_results(30)
            .execute();
        const publicIds = resources.map(file=> file.public_id);
        res.send(publicIds);
    }
    catch(error){
        console.log(error);
        res.status(500).json({err: 'Something went wrong'});
    }
}

module.exports = {
    uploadPhotoController,
    getAllPhotos
}