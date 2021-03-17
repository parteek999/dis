const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    UniversalFunctions = require('../Utils/UniversalFunctions'),
    TokenManager = require('../Libs/TokenManager'),
    Models = require('../Models'),
    Bcrypt = require('bcryptjs'),
    request = require("request");

const news = async (payload,userDetails) => {
    let query={
        article:payload.article,
        admin_id:userDetails._id
    }
    final = await DAO.saveData(Models.news,query);
    return final
}
module.exports = {
    news
}