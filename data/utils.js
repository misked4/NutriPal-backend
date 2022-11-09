'use strict';
const fs = require('fs-extra');
const {join} = require('path');
const loadSqlQueries = async (folderName) => {
    const filePath = join(process.cwd(), 'data', folderName);
    const files = await fs.readdir(filePath);
    const sqlFiles = await files.filter(f => f.endsWith('.sql'));
    const queries = {};
    for(const sqlFile of sqlFiles){
        const query = await fs.readFileSync(join(filePath, sqlFile), {encoding: "UTF-8"});
        queries[sqlFile.replace(".sql","")] = query
    }
    return queries;
}
//niz koj ima npr quries[namirnicelist]=<zadatiquery u fajlu>

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = {
    loadSqlQueries,
    cloudinary
}