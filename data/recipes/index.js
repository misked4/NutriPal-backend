'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const addRecipeData = async(recipeDataModel) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('recipes');
        // #region insertUser - SERBIAN!!
        const insertRecipe = await pool.request()
                                .input('Naslov', sql.NVarChar(sql.MAX), recipeDataModel.Naslov)
                                .input('Opis', sql.NVarChar(sql.MAX), recipeDataModel.Opis)
                                .input('Minutaza', sql.Int, recipeDataModel.Minutaza)
                                .input('Broj_porcija', sql.Int, recipeDataModel.Broj_porcija)
                                .input('KreatorId', sql.Int, recipeDataModel.KreatorId)
                                .input('Slika', sql.NVarChar(sql.MAX), recipeDataModel.Slika)
                                .input('Cloudinary_public_id', sql.NVarChar(sql.MAX), recipeDataModel.Cloudinary_public_id)
                                .query(sqlQueries.createRecipeQuery);
        // #endregion
        const recipeId = insertRecipe.recordset[0].lastAdded;
        const arrayOfGrocery = recipeDataModel.Niz_namirnica;
        if(arrayOfGrocery.length > 0)
        {
            for(var i=0; i<arrayOfGrocery.length; i++)
                addRecipeGroceryLink(recipeId, arrayOfGrocery[i]);
        }
        return insertRecipe.recordset;
    }
    catch(error){
        return error.message;
    }
}

const addRecipeGroceryLink = async(recipeId, grocery) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('recipes');
        const insertRecipeGroceryLink = await pool.request()
                        .input('ReceptId', sql.Int, recipeId)
                        .input('NamirnicaId', sql.Int, grocery.id)
                        .input('Kolicina', sql.Real, grocery.Kolicina)
                        .input('Jedinica_mere', sql.NVarChar(sql.MAX), "g")
                        .query(sqlQueries.createRecipeGroceryLinkQuery);
    }
    catch(error){
        return error.message;
    }
}

const searchRecipes = async(wordFromReq, page) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('recipes');
        const number = (page - 1) * 10;
        const recipes = await pool.request()
                                        .input('word', sql.NVarChar(100), wordFromReq)
                                        .input('number', sql.Int, number)
                                        .query(sqlQueries.searchRecipesQuery);
        return recipes.recordset;
    }
    catch(error){
        return error.message;
    }
}

const increaseLikes = async(ReceptId, KorisnikId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('recipes');
        // #region insertUser - SERBIAN!!
        const increaseLikes = await pool.request()
                                .input('ReceptId', sql.Int, ReceptId)
                                .input('KorisnikId', sql.Int, KorisnikId)
                                .query(sqlQueries.increaseLikeQuery);
        // #endregion
        return increaseLikes.recordset;
    }
    catch(error){
        return error.message;
    }
}

const decreaseLikes = async(ReceptId, KorisnikId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('recipes');
        // #region insertUser - SERBIAN!!
        const decreaseLikes = await pool.request()
                                .input('ReceptId', sql.Int, ReceptId)
                                .input('KorisnikId', sql.Int, KorisnikId)
                                .query(sqlQueries.decreaseLikeQuery);
        // #endregion
        return decreaseLikes.recordset;
    }
    catch(error){
        return error.message;
    }
}

const searchLike = async(ReceptId, KorisnikId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('recipes');
        const recipes = await pool.request()
                                .input('ReceptId', sql.Int, ReceptId)
                                .input('KorisnikId', sql.Int, KorisnikId)
                                .query(sqlQueries.searchLikeQuery);
        return recipes.recordset;
    }
    catch(error){
        return error.message;
    }
}

const returnUnseenLikes = async(userId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('recipes');
        const likes = await pool.request()
                                .input('userId', sql.Int, userId)
                                .query(sqlQueries.returnUnseenLikedRecipesQuery);
        return likes.recordset;
    }
    catch(error){
        return error.message;
    }
}

const getRecipe = async(recipeId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('recipes');
        const recipe = await pool.request()
                                .input('id', sql.Int, recipeId)
                                .query(sqlQueries.getRecipeQuery);
        return recipe.recordset;
    }
    catch(error){
        return error.message;
    }
}

const changeSeenLikes = async(userId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('recipes');
        const countSeenLikes = await pool.request()
                                .input('userId', sql.Int, userId)
                                .query(sqlQueries.setSeenLikesQuery);
        return countSeenLikes.recordset;
    }
    catch(error){
        return error.message;
    }
}

const searchRecipesForOneNutritionist = async(KreatorId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('recipes');
        const recipes = await pool.request()
                                        .input('KreatorId', sql.Int, KreatorId)
                                        .query(sqlQueries.searchRecipesForOneNutritionistQuery);
        return recipes.recordset;
    }
    catch(error){
        return error.message;
    }
}

const returnGroceriesForOneRecipe = async(recipeId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('recipes');
        const recipes = await pool.request()
                                        .input('recipeId', sql.Int, recipeId)
                                        .query(sqlQueries.returnGroceriesForOneRecipeQuery);
        return recipes.recordset;
    }
    catch(error){
        return error.message;
    }
}

module.exports = {
    addRecipeData,
    searchRecipes,
    increaseLikes,
    decreaseLikes,
    searchLike,
    returnUnseenLikes,
    getRecipe,
    changeSeenLikes,
    searchRecipesForOneNutritionist,
    returnGroceriesForOneRecipe
}