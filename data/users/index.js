'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getUsers = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        const list = await pool.request().query(sqlQueries.userListQuery);
        return list.recordset;
    }
    catch(error) {
        return error.message;
    }
}

const getUserById = async(inputId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        const OneUser = await pool.request().input('userId', sql.Int, inputId).query(sqlQueries.userByIdQuery);
        return OneUser.recordset;
    }
    catch(error){
        return error.message;
    }
}

const getUserByEmail = async (inputEmail, inputPassword) => {
    try{ 
        //getUserByEmailAndAddInfoQuery je za korinsike, da bi imali i njihove dodatne info podatke.
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        const result = await pool.request()
                                .input('Email', sql.NVarChar(100), inputEmail)
                                .input('Password', sql.NVarChar(100), inputPassword)
                                .query(sqlQueries.getUserByEmailAndAddInfoQuery);
        if(result.recordset.length == 0){
            const list = await pool.request()
                                    .input('Email', sql.NVarChar(100), inputEmail)
                                    .input('Password', sql.NVarChar(100), inputPassword)
                                    .query(sqlQueries.getUserByEmailQuery);
            return list.recordset;
        }
        return result.recordset;
    }
    catch(error) {
        return error.message;
    }
}

const createUser = async(userData) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        // #region insertUser - SERBIAN!!
        const insertUser = await pool.request()
                                .input('Ime', sql.NVarChar(sql.MAX), userData.Ime)
                                .input('Prezime', sql.NVarChar(sql.MAX), userData.Prezime)
                                .input('Email', sql.NVarChar(100), userData.Email)
                                .input('Lozinka', sql.NVarChar(sql.MAX), userData.Lozinka)
                                .input('Datum_rodjenja', sql.Date, userData.Datum_rodjenja)
                                .input('Uloga', sql.NVarChar(sql.MAX), userData.Uloga)
                                .input('Telefon', sql.NVarChar(sql.MAX), userData.Telefon)
                                .input('Adresa', sql.NVarChar(sql.MAX), userData.Adresa)
                                .input('Slika', sql.VarChar(sql.MAX), userData.Slika) 
                                .input('Dodatne_info_Id', sql.Int, userData.Dodatne_info_Id)
                                .input('Pol', sql.NVarChar(sql.MAX), userData.Pol)
                                .input('Cloudinary_public_id', sql.NVarChar(sql.MAX), userData.Cloudinary_public_id)                                
                                .query(sqlQueries.createUserQuery);
        // #endregion
        return insertUser.recordset;
    }
    catch(error){
        return error.message;
    }
}

const updateUser = async(userId, userData) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
         // #region updateUser - SERBIAN!!
        const update = await pool.request()
                        .input("id", sql.Int, userId)
                        .input('Ime', sql.NVarChar(sql.MAX), userData.Ime)
                        .input('Prezime', sql.NVarChar(sql.MAX), userData.Prezime)
                        //nemamo email,to ne mozemo da promenimo
                        .input('Lozinka', sql.NVarChar(sql.MAX), userData.Lozinka)
                        .input('Datum_rodjenja', sql.Date, userData.Datum_rodjenja)
                        .input('Uloga', sql.NVarChar(sql.MAX), userData.Uloga)
                        .input('Telefon', sql.NVarChar(sql.MAX), userData.Telefon)
                        .input('Adresa', sql.NVarChar(sql.MAX), userData.Adresa)
                        .input('Slika', sql.VarChar(sql.MAX), userData.Slika)
                        .input('Pol', sql.NVarChar(sql.MAX), userData.Pol)
                        .input('Cloudinary_public_id', sql.VarChar(sql.MAX), userData.Cloudinary_public_id)
                        .query(sqlQueries.updateUserQuery);
        // #endregion
        return update.recordset;
    }
    catch(error){
        return error.message;
    }
}

const deleteUser = async(userId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        const deleted = await pool.request()
                            .input('id', sql.Int, userId)
                            .query(sqlQueries.deleteUserQuery);
        return deleted.recordset;
    }
    catch(error){
        return error.message;
    }
}

const checkRegularEmail = async(inputEmail) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        const list = await pool.request()
                                .input('Email', sql.NVarChar(100), inputEmail)
                                .query(sqlQueries.checkEmailQuery);
        return list.recordset;
    }
    catch(error) {
        return error.message;
    }
}

const getMealPerDay = async(meal, day, goal) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        const oneMealPerDay = await pool.request()
                                .input('meal', sql.Int, meal)
                                .input('day', sql.Int, day)
                                .input('goal', sql.NVarChar(100), goal)
                                .query(sqlQueries.getMealPerDayQuery);
        return oneMealPerDay.recordset;
    }
    catch(error){
        return error.message;
    }
}

const insertIntoRecipeUserPerMeal = async(recipeId, userId, mealPerDayId, numberOfServings, sum_kcal, sum_UH, sum_PROTEINI, sum_MASTI) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        // #region insertedData - SERBIAN!!
        const insertedData = await pool.request()
                                .input('ReceptId', sql.Int, recipeId)
                                .input('KorisnikId', sql.Int, userId)
                                .input('ObrokUTokuDanaId', sql.Int, mealPerDayId)
                                .input('Broj_porcija', sql.Int, numberOfServings)  
                                .input('sum_kcal', sql.Real, sum_kcal)
                                .input('sum_UH', sql.Real, sum_UH)
                                .input('sum_PROTEINI', sql.Real, sum_PROTEINI)
                                .input('sum_MASTI', sql.Real, sum_MASTI)                       
                                .query(sqlQueries.insertIntoRecipeUserPerMealQuery);
        // #endregion
        return insertedData.recordset;
    }
    catch(error){
        return error.message;
    }
}

const deleteRecipeUserPerMeal = async(userId, mealPerDayId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        // #region deletedData - SERBIAN!!
        const deletedData = await pool.request()
                                .input('KorisnikId', sql.Int, userId)
                                .input('ObrokUTokuDanaId', sql.Int, mealPerDayId)                           
                                .query(sqlQueries.deleteRecipeUserPerMealQuery);
        // #endregion
        return deletedData.recordset;
    }
    catch(error){
        return error.message;
    }
}

const getRecipeFromRecipeUserPerMeal = async(userId, mealPerDayId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        // #region returnedData - SERBIAN!!
        const returnedData = await pool.request()
                .input('KorisnikId', sql.Int, userId)
                .input('ObrokUTokuDanaId', sql.Int, mealPerDayId)                        
                .query(sqlQueries.getRecipeAndNumberOfServingsQuery);
        // #endregion
        return returnedData.recordset;
    }
    catch(error){
        return error.message;
    }
}

const checkIfUserHaveWeeklyMenu = async(userId, goal) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        // #region returnedData - SERBIAN!!
        const returnedData = await pool.request()
                .input('KorisnikId', sql.Int, userId)
                .input('Cilj_ishrane', sql.NVarChar(100), goal)                        
                .query(sqlQueries.checkIfUserHaveWeeklyMenuQuery);
        // #endregion
        return returnedData.recordset;
    }
    catch(error){
        return error.message;
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail,
    checkRegularEmail,
    getMealPerDay,
    insertIntoRecipeUserPerMeal,
    deleteRecipeUserPerMeal,
    getRecipeFromRecipeUserPerMeal,
    checkIfUserHaveWeeklyMenu
}