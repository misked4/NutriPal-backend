'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const addDietData = async(dietData) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('diets');
        // #region insertDiet - SERBIAN!!
        const insertDiet = await pool.request()
                                .input('Naziv', sql.NVarChar(sql.MAX), dietData.Naziv)
                                .input('Opis', sql.NVarChar(sql.MAX), dietData.Opis)
                                .input('UH_min', sql.Real, dietData.UH_min)
                                .input('UH_max', sql.Real, dietData.UH_max)
                                .input('PROTEINI_min', sql.Real, dietData.PROTEINI_min)
                                .input('PROTEINI_max', sql.Real, dietData.PROTEINI_max)
                                .input('MASTI_min', sql.Real, dietData.MASTI_min)
                                .input('MASTI_max', sql.Real, dietData.MASTI_max)
                                .input('KreatorId', sql.Int, dietData.KreatorId)
                                .query(sqlQueries.createDietQuery);
        // #endregion
        return insertDiet.recordset;
    }
    catch(error){
        return error.message;
    }
}

const getAllDiets = async() => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('diets');
        const insertDiet = await pool.request().query(sqlQueries.getAllDietsQuery);
        return insertDiet.recordset;
    }
    catch(error){
        return error.message;
    }
}

const getDiet = async(id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('diets');
        const diet = await pool.request()
                        .input('id', sql.Int, id)
                        .query(sqlQueries.getDietQuery);
        return diet.recordset;
    }
    catch(error){
        return error.message;
    }
}
module.exports = {
    addDietData,
    getAllDiets,
    getDiet
}