'use strict'

const express = require('express');
const imagesController = require('../controllers/imagesController');
const router = express.Router();

const { uploadPhotoController, getAllPhotos } = imagesController;

router.post('/images/upload', uploadPhotoController);
router.get('/images', getAllPhotos);

module.exports = {
    routes: router
}