'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getActivities = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('activities');
        const list = await pool.request().query(sqlQueries.activitiesListQuery);
        return list.recordset;
    }
    catch(error) {
        return error.message;
    }
}
module.exports = {
    getActivities
}