'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getGroceries = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('groceries');
        const list = await pool.request().query(sqlQueries.groceryListQuery);
        return list.recordset;
    }
    catch(error) {
        return error.message;
    }
}

const getGroceryById = async(inputId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('groceries');
        const OneGrocery = await pool.request().input('groceryId', sql.Int, inputId).query(sqlQueries.groceryByIdQuery);
        return OneGrocery.recordset;
    }
    catch(error){
        return error.message;
    }

}

const getGroceriesByName = async (inputName) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('groceries');
        const list = await pool.request().input('Name', sql.NVarChar(sql.MAX), inputName).query(sqlQueries.getGroceriesByNameQuery);
        return list.recordset;
    }
    catch(error) {
        return error.message;
    }
}

const createGrocery = async(groceryData) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('groceries');
        // #region insertGrocery - SERBIAN!!
        const insertGrocery = await pool.request()
                                .input('Naziv', sql.NVarChar(sql.MAX), groceryData.Naziv)
                                .input('kcal', sql.Real, groceryData.kcal)
                                .input('UH', sql.Real, groceryData.UH)
                                .input('Proteini', sql.Real, groceryData.Proteini)
                                .input('Masti', sql.Real, groceryData.Masti)
                                .input('Kategorija', sql.NVarChar(sql.MAX), groceryData.Kategorija)
                                .input('Slika', sql.VarChar(sql.MAX), groceryData.Slika)
                                .input('Energetska_vrednost', sql.Real, groceryData.Energetska_vrednost)
                                .input('Ukupno_proteina', sql.Real, groceryData.Ukupno_proteina)
                                .input('Ukupno_ugljenih_hidrata', sql.Real, groceryData.Ukupno_ugljenih_hidrata)
                                .input('Ukupno_masti', sql.Real, groceryData.Ukupno_masti)
                                .input('od_toga_zasicene_masne_kiseline', sql.Real, groceryData.od_toga_zasicene_masne_kiseline)
                                .input('Dijetalna_vlakna', sql.Real, groceryData.Dijetalna_vlakna)
                                .input('Ukupno_secera', sql.Real, groceryData.Ukupno_secera)
                                .input('Holesterol', sql.Real, groceryData.Holesterol)
                                .input('Voda', sql.Real, groceryData.Voda)
                                .input('Mononezasicene_masne_kiseline', sql.Real, groceryData.Mononezasicene_masne_kiseline)
                                .input('Polinezasicene_masne_kiseline', sql.Real, groceryData.Polinezasicene_masne_kiseline)
                                .input('VitaminC', sql.Real, groceryData.VitaminC)
                                .input('VitaminB1_Tiamin', sql.Real, groceryData.VitaminB1_Tiamin)
                                .input('VitaminB2_Riboflavin', sql.Real, groceryData.VitaminB2_Riboflavin)
                                .input('VitaminB3_Niacin', sql.Real, groceryData.VitaminB3_Niacin)
                                .input('VitaminB5_Pantotenska_kiselina', sql.Real, groceryData.VitaminB5_Pantotenska_kiselina)
                                .input('VitaminB6_Piridoksin', sql.Real, groceryData.VitaminB6_Piridoksin)
                                .input('VitaminB9_Folati', sql.Real, groceryData.VitaminB9_Folati)
                                .input('VitaminB12_Kobalamin', sql.Real, groceryData.VitaminB12_Kobalamin)
                                .input('VitaminA', sql.Real, groceryData.VitaminA)
                                .input('VitaminD', sql.Real, groceryData.VitaminD)
                                .input('VitaminE', sql.Real, groceryData.VitaminE)
                                .input('VitaminK', sql.Real, groceryData.VitaminK)
                                .input('Kalcijum_Ca', sql.Real, groceryData.Kalcijum_Ca)
                                .input('Zeljezo_Fe', sql.Real, groceryData.Zeljezo_Fe)
                                .input('Magnezijum_Mg', sql.Real, groceryData.Magnezijum_Mg)
                                .input('Fosfor_P', sql.Real, groceryData.Fosfor_P)
                                .input('Kalijum_K', sql.Real, groceryData.Kalijum_K)
                                .input('Natrijum_Na', sql.Real, groceryData.Natrijum_Na)
                                .input('Cink_Zn', sql.Real, groceryData.Cink_Zn)
                                .input('Bakar_Cu', sql.Real, groceryData.Bakar_Cu)
                                .input('Mangan_Mn', sql.Real, groceryData.Mangan_Mn)
                                .input('Selen_Se', sql.Real, groceryData.Selen_Se)
                                .query(sqlQueries.createGroceryQuery);
        // #endregion
        return insertGrocery.recordset;
    }
    catch(error){
        return error.message;
    }
}

const updateGrocery = async(groceryId, groceryData) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('groceries');
         // #region updateGrocery - SERBIAN!!
        const update = await pool.request()
                        .input("id", sql.Int, groceryId)
                        .input('Naziv', sql.NVarChar(sql.MAX), groceryData.Naziv)
                                .input('kcal', sql.Real, groceryData.kcal)
                                .input('UH', sql.Real, groceryData.UH)
                                .input('Proteini', sql.Real, groceryData.Proteini)
                                .input('Masti', sql.Real, groceryData.Masti)
                                .input('Kategorija', sql.NVarChar(sql.MAX), groceryData.Kategorija)
                                .input('Slika', sql.VarChar(sql.MAX), groceryData.Slika)
                                .input('Energetska_vrednost', sql.Real, groceryData.Energetska_vrednost)
                                .input('Ukupno_proteina', sql.Real, groceryData.Ukupno_proteina)
                                .input('Ukupno_ugljenih_hidrata', sql.Real, groceryData.Ukupno_ugljenih_hidrata)
                                .input('Ukupno_masti', sql.Real, groceryData.Ukupno_masti)
                                .input('od_toga_zasicene_masne_kiseline', sql.Real, groceryData.od_toga_zasicene_masne_kiseline)
                                .input('Dijetalna_vlakna', sql.Real, groceryData.Dijetalna_vlakna)
                                .input('Ukupno_secera', sql.Real, groceryData.Ukupno_secera)
                                .input('Holesterol', sql.Real, groceryData.Holesterol)
                                .input('Voda', sql.Real, groceryData.Voda)
                                .input('Mononezasicene_masne_kiseline', sql.Real, groceryData.Mononezasicene_masne_kiseline)
                                .input('Polinezasicene_masne_kiseline', sql.Real, groceryData.Polinezasicene_masne_kiseline)
                                .input('VitaminC', sql.Real, groceryData.VitaminC)
                                .input('VitaminB1_Tiamin', sql.Real, groceryData.VitaminB1_Tiamin)
                                .input('VitaminB2_Riboflavin', sql.Real, groceryData.VitaminB2_Riboflavin)
                                .input('VitaminB3_Niacin', sql.Real, groceryData.VitaminB3_Niacin)
                                .input('VitaminB5_Pantotenska_kiselina', sql.Real, groceryData.VitaminB5_Pantotenska_kiselina)
                                .input('VitaminB6_Piridoksin', sql.Real, groceryData.VitaminB6_Piridoksin)
                                .input('VitaminB9_Folati', sql.Real, groceryData.VitaminB9_Folati)
                                .input('VitaminB12_Kobalamin', sql.Real, groceryData.VitaminB12_Kobalamin)
                                .input('VitaminA', sql.Real, groceryData.VitaminA)
                                .input('VitaminD', sql.Real, groceryData.VitaminD)
                                .input('VitaminE', sql.Real, groceryData.VitaminE)
                                .input('VitaminK', sql.Real, groceryData.VitaminK)
                                .input('Kalcijum_Ca', sql.Real, groceryData.Kalcijum_Ca)
                                .input('Zeljezo_Fe', sql.Real, groceryData.Zeljezo_Fe)
                                .input('Magnezijum_Mg', sql.Real, groceryData.Magnezijum_Mg)
                                .input('Fosfor_P', sql.Real, groceryData.Fosfor_P)
                                .input('Kalijum_K', sql.Real, groceryData.Kalijum_K)
                                .input('Natrijum_Na', sql.Real, groceryData.Natrijum_Na)
                                .input('Cink_Zn', sql.Real, groceryData.Cink_Zn)
                                .input('Bakar_Cu', sql.Real, groceryData.Bakar_Cu)
                                .input('Mangan_Mn', sql.Real, groceryData.Mangan_Mn)
                                .input('Selen_Se', sql.Real, groceryData.Selen_Se)
                                .query(sqlQueries.updateGroceryQuery);
        // #endregion
        return update.recordset;
    }
    catch(error){
        return error.message;
    }
}

const deleteGrocery = async(groceryId) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('groceries');
        const deleted = await pool.request()
                            .input('id', sql.Int, groceryId)
                            .query(sqlQueries.deleteGroceryQuery);
        return deleted.recordset;
    }
    catch(error){
        return error.message;
    }
}

module.exports = {
    getGroceries,
    getGroceryById,
    createGrocery,
    updateGrocery,
    deleteGrocery,
    getGroceriesByName
}