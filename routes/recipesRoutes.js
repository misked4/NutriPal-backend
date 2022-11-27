'use strict'

const express = require('express');
const recipesController = require('../controllers/recipesController');
const router = express.Router();

const { addRecipeFromController, searchRecipesFromController, increaseOrDecreaseLikesController, searchLikesController,
    returnUnseenLikesController, getOneRecipeController, changeSeenToRecipesController, searchRecipesForOneNutricionistController, 
    returnGroceriesForOneRecipeController, returnRecipeWithFullGroceriesController } = recipesController;

router.post('/recipe', addRecipeFromController);
router.put('/recipe/:id', increaseOrDecreaseLikesController);
router.get('/recipe/:id', getOneRecipeController);
router.get('/recipe/like/:id', searchLikesController);

router.get('/recipes', searchRecipesFromController);
router.get('/recipes/:id', searchRecipesForOneNutricionistController);
router.get('/recipes/like/:id', returnUnseenLikesController);
router.get('/recipes/likes/:id', changeSeenToRecipesController);

router.get('/fullrecipe/:id', returnGroceriesForOneRecipeController);
router.get('/fullgroceries/:id', returnRecipeWithFullGroceriesController);

module.exports = {
    routes: router
}