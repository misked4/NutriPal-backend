'use strict';

const recipesData = require('../data/recipes/index');


const addRecipeFromController = async(req, res, next) => {
    try{
        const data = req.body;
        const createdRecipe = await recipesData.addRecipeData(data);
        res.send(createdRecipe);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const searchRecipesFromController = async(req, res, next) => {
    try{
        const wordFromReq = req.query.search;
        const pageFromReq = req.query.page;
        const Recipes = await recipesData.searchRecipes(wordFromReq, pageFromReq);
        if(!Recipes.length)
        {
            res.status(404).send("Not found");
        }
        else res.send(Recipes);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const increaseOrDecreaseLikesController = async(req, res, next) => {
    try{
        const recipeId = req.params.id;
        const func = req.query.func;
        const userId = req.query.userId;
        if(func==="increase")
        {
            const increasedLikes = await recipesData.increaseLikes(recipeId,userId);
            res.send(increasedLikes);
        }
        else
        {
            const decreasedLikes = await recipesData.decreaseLikes(recipeId,userId);
            res.send(decreasedLikes);
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const searchLikesController = async(req, res, next) => {
    try{
        const recipeId = req.params.id;
        const userId = req.query.userId;
        const foundLike = await recipesData.searchLike(recipeId,userId);
        if(!foundLike.length)
        {
            res.status(404).send("Not found");
        }
        else res.send(foundLike);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const returnUnseenLikesController = async(req, res, next) => {
    try{
        const userId = req.params.id;
        const foundLikes = await recipesData.returnUnseenLikes(userId);
        if(!foundLikes.length)
        {
            res.status(404).send("Not found");
        }
        else res.send(foundLikes);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getOneRecipeController = async(req, res, next) => {
    try{
        const recipeId = req.params.id;
        const recipe = await recipesData.getRecipe(recipeId);
        if(!recipe.length)
        {
            res.status(404).send("Not found");
        }
        else res.send(recipe);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const changeSeenToRecipesController = async(req, res, next) => {
    try{
        const userId = req.params.id;
        const result = await recipesData.changeSeenLikes(userId);
        res.send(result);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const searchRecipesForOneNutricionistController = async(req, res, next) => {
    try{
        const userId = req.params.id;
        const Recipes = await recipesData.searchRecipesForOneNutritionist(userId);
        if(!Recipes.length)
        {
            const emptyArray = [];
            res.send(emptyArray);
        }
        else res.send(Recipes);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const returnGroceriesForOneRecipeController = async(req, res, next) => {
    try{
        const recipeId = req.params.id;
        const groceries = await recipesData.returnGroceriesForOneRecipe(recipeId);
        if(!groceries.length)
        {
            const emptyArray = [];
            res.send(emptyArray);
        }
        else res.send(groceries);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const returnRecipeWithFullGroceriesController = async(req, res, next) => {
    try{
        const recipeId = req.params.id;
        const groceries = await recipesData.returnGroceriesWithVitaminsForOneRecipe(recipeId);
        if(!groceries.length)
        {
            const emptyArray = [];
            res.send(emptyArray);
        }
        else res.send(groceries);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addRecipeFromController,
    searchRecipesFromController,
    increaseOrDecreaseLikesController,
    searchLikesController,
    returnUnseenLikesController,
    getOneRecipeController,
    changeSeenToRecipesController,
    searchRecipesForOneNutricionistController,
    returnGroceriesForOneRecipeController,
    returnRecipeWithFullGroceriesController
}