'use strict';

const usersData = require('../data/users/index');

const getUsersFromController = async(req, res, next) => {
    try{
        const users = await usersData.getUsers();
        if(!users.length)
        {
            res.status(404).send("Not found");
        }
        else res.send(users);        
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getUserFromController = async(req, res, next) => {
    try{
        const userIdFromReq = req.params.id;
        const OneUser = await usersData.getUserById(userIdFromReq);
        if(!OneUser.length)
        {
            res.status(404).send("Not found");
        }
        else res.send(OneUser);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getUserByEmailFromController = async(req, res, next) => {
    try{
        const userEmailFromReq = req.query.email; //NEW NEW NEW
        const userPassword = req.query.password;
        const user = await usersData.getUserByEmail(userEmailFromReq, userPassword);
        if(!user.length)
        {
            res.status(404).send("Not found");
        }
        else res.send(user);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const addUserFromController = async(req, res, next) => {
    try{
        const data = req.body;
        const createdUser = await usersData.createUser(data);
        res.send(createdUser);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const updateUserFromController = async(req, res, next) => {
    try{
        const userId = req.params.id;
        const data = req.body;
        const updatedUser = await usersData.updateUser(userId, data);
        res.send(updatedUser);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const deleteUserFromController = async(req, res, next) => {
    try{
        const userId = req.params.id;
        const deletedUser = await usersData.deleteUser(userId);
        res.send(deletedUser);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const checkUserByEmailFromController = async(req, res, next) => {
    try{
        const userEmailFromReq = req.query.email;
        const user = await usersData.checkRegularEmail(userEmailFromReq);
        if(!user.length)
        {
            res.status(404).send("Not found");
        }
        else res.send(user);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const addWeeklyMenuController = async(req, res, next) => {
    try{    
        const fullData = req.body;
        const matrix = fullData.matrix;
        const userId = fullData.userId;
        const goal = fullData.goal;

        var recipeId = null;
        var numberOfServings = null;
        var sum_kcal = null;
        var sum_UH = null;
        var sum_PROTEINI = null;
        var sum_MASTI = null;

        var mealPerDay = null;
        var mealPerDayId = null;

        for(var i = 1; i<7; i++)
        {
            for(var j = 1; j<8; j++)
            {
                mealPerDay = await usersData.getMealPerDay(i, j, goal);
                mealPerDayId = mealPerDay[0].id;
                await usersData.deleteRecipeUserPerMeal(userId, mealPerDayId);
                
                if(matrix[i][j]!=null)
                {
                    recipeId = matrix[i][j].chosenRecipe;
                    numberOfServings = matrix[i][j].numberOfServings;
                    sum_kcal = matrix[i][j].sum_kcal,
                    sum_UH = matrix[i][j].sum_UH,
                    sum_PROTEINI = matrix[i][j].sum_PROTEINI,
                    sum_MASTI = matrix[i][j].sum_MASTI,
                    await usersData.insertIntoRecipeUserPerMeal(recipeId, userId, mealPerDayId, numberOfServings, sum_kcal, sum_UH, sum_PROTEINI, sum_MASTI);
                }
            }
        }
        res.status(200).send([]);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getWeeklyMenuController = async(req, res, next) => {
    try{
        const nutritionistId = req.query.nutritionistId;
        const patientId = req.query.patientId;
        const goal = req.query.goal;
        var userId = null;
        
        if(nutritionistId === patientId){
            userId = nutritionistId;
        }
        else{
            const checkIfPatientAlreadyHaveWeeklyMenu = await usersData.checkIfUserHaveWeeklyMenu(patientId, goal);
            if(checkIfPatientAlreadyHaveWeeklyMenu.length>0)
                userId = patientId;
            else userId = nutritionistId;            
        }
        var mealPerDay = null;
        var mealPerDayId = null;
        var recipeuserForMeal = null;
        var matrix = [];
        for(let i=0; i<7; i++) {
            matrix[i] = new Array(8);
        }

        // #region initialMatrix
        matrix[0][0] = "";
        matrix[0][1] = "Ponedeljak";
        matrix[0][2] = "Utorak";
        matrix[0][3] = "Sreda";
        matrix[0][4] = "Cetvrtak";
        matrix[0][5] = "Petak";
        matrix[0][6] = "Subota";
        matrix[0][7] = "Nedelja";
        matrix[1][0] = "Dorucak";
        matrix[2][0] = "Jutarnja uzina";
        matrix[3][0] = "Rucak";
        matrix[4][0] = "Popodnevna uzina";
        matrix[5][0] = "Vecera";
        matrix[6][0] = "Obrok posle vecere";
        // #endregion
        
        for(let i = 1; i<7; i++)
        {
            for(let j = 1; j<8; j++)
            {
                mealPerDay = await usersData.getMealPerDay(i, j, goal);
                mealPerDayId = mealPerDay[0].id;
                
                recipeuserForMeal = await usersData.getRecipeFromRecipeUserPerMeal(userId, mealPerDayId);
                if(recipeuserForMeal.length === 0)
                    matrix[i][j] = null;
                else {
                    const dataForMatrix = {
                        chosenRecipe: recipeuserForMeal[0].ReceptId,
                        chosenRecipeName: recipeuserForMeal[0].Naslov,
                        numberOfServings: recipeuserForMeal[0].Broj_porcija,
                        sum_kcal: recipeuserForMeal[0].sum_kcal,
                        sum_UH: recipeuserForMeal[0].sum_UH,
                        sum_PROTEINI: recipeuserForMeal[0].sum_PROTEINI,
                        sum_MASTI: recipeuserForMeal[0].sum_MASTI,
                    }
                    matrix[i][j] = dataForMatrix;
                }
            }
        }
        res.status(200).send(matrix);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    getUsersFromController,
    getUserFromController,
    addUserFromController,
    updateUserFromController,
    deleteUserFromController,
    getUserByEmailFromController,
    checkUserByEmailFromController,
    addWeeklyMenuController,
    getWeeklyMenuController
}