'use strict'

const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

const { getUsersFromController, getUserFromController, addUserFromController, updateUserFromController, 
    deleteUserFromController, getUserByEmailFromController, checkUserByEmailFromController,
    addWeeklyMenuController, getWeeklyMenuController } = usersController;

router.get('/users', getUsersFromController);
router.get('/user/:id', getUserFromController);
router.get('/user', getUserByEmailFromController);
router.get('/useremail', checkUserByEmailFromController);
router.post('/user', addUserFromController);
router.put('/user/:id', updateUserFromController);
router.delete('/user/:id', deleteUserFromController);

router.get('/weeklymenu', getWeeklyMenuController);
router.post('/weeklymenu', addWeeklyMenuController);

module.exports = {
    routes: router
}