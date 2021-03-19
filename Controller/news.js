const { query } = require('winston');

const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    UniversalFunctions = require('../Utils/UniversalFunctions'),
    TokenManager = require('../Libs/TokenManager'),
    Models = require('../Models'),
    Bcrypt = require('bcryptjs'),
    request = require("request");

const news = async (payload, userDetails) => {

    console.log(payload);
    final = await DAO.saveData(Models.news, payload);
    return final
}
const getArticle = async (payload, userdetails) => {
    console.log(userdetails);
    const query = {
        isDeleted: false
    }
    return DAO.getData(Models.news, query);
}
module.exports = {
    news, getArticle
}