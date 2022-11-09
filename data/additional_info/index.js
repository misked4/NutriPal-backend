'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getPatients = async(inputId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('additional_info');
        const OneUser = await pool.request().input('userId', sql.Int, inputId).query(sqlQueries.getUsersWithAddInfoQuery);
        return OneUser.recordset;
    }
    catch(error){
        return error.message;
    }
}

const deleteAddInfo = async(infoId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('additional_info');
        const OneUser = await pool.request()
                                    .input('infoId', sql.Int, infoId)
                                    .query(sqlQueries.deleteAddInfoQuery);
        return OneUser.recordset;
    }
    catch(error){
        return error.message;
    }
}

const addAdditionalInfo = async(addInfoData) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('additional_info');
        // #region addAdditionalInfo - SERBIAN!!
        const insertUser = await pool.request()
                                .input('KreatorId', sql.Int, addInfoData.KreatorId)
                                .input('Visina', sql.Int, addInfoData.Visina)
                                .input('Tezina', sql.Int, addInfoData.Tezina)
                                .input('PotrosnjaKalorija', sql.Real, addInfoData.PotrosnjaKalorija)
                                .input('DijetaId', sql.Int, addInfoData.DijetaId)
                                .input('Cilj_ishrane', sql.VarChar(100), addInfoData.Cilj_ishrane)
                                .input('BMR', sql.Real, addInfoData.BMR)
                                .input('TEE', sql.Real, addInfoData.TEE)
                                .input('BMI', sql.Real, addInfoData.BMI)
                                .query(sqlQueries.createAdditionalInfoQuery);
        // #endregion
        return insertUser.recordset;
    }
    catch(error){
        return error.message;
    }
}

const searchPatients = async(userIdFromReq, wordFromReq) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('additional_info');
        const users = await pool.request().input('userId', sql.Int, userIdFromReq)
                                        .input('word', sql.NVarChar(100), wordFromReq)
                                        .query(sqlQueries.searchUsersWithAddInfoQuery);
        return users.recordset;
    }
    catch(error){
        return error.message;
    }
}

const getAdditionalInfo = async(id) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('additional_info');
        const addInfo = await pool.request()
                        .input('id', sql.Int, id)
                        .query(sqlQueries.getAddInfoQuery);
        return addInfo.recordset;
    }
    catch(error){
        return error.message;
    }
}

const updateAdditionalInfo = async(addInfoId, addinfoData) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('additional_info');
         // #region addinfoData - SERBIAN!!
        const update = await pool.request()
                        .input('id', sql.Int, addInfoId)
                        .input('Visina', sql.Int, addinfoData.Visina)
                        .input('Tezina', sql.Int, addinfoData.Tezina)
                        .input('PotrosnjaKalorija', sql.Real, addinfoData.PotrosnjaKalorija)
                        .input('DijetaId', sql.Int, addinfoData.DijetaId)
                        .input('Cilj_ishrane', sql.VarChar(100), addinfoData.Cilj_ishrane)
                        /**.input('BMR', sql.Real, addInfoData.BMR)
                            .input('TEE', sql.Real, addInfoData.TEE)
                            .input('BMI', sql.Real, addInfoData.BMI) */
                        .query(sqlQueries.updateAdditionalInfoQuery);
        // #endregion
        return update.recordset;
    }
    catch(error){
        return error.message;
    }
}

module.exports = {
    getPatients,
    deleteAddInfo,
    addAdditionalInfo,
    searchPatients,
    getAdditionalInfo,
    updateAdditionalInfo
}