const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    TokenManager = require('../Libs/TokenManager'),
    Models = require('../Models'),
    Bcrypt = require('bcryptjs');



const register = async (payload) => {
    // console.log(payload)
    const final = await DAO.saveData(Models.registration, payload)
    console.log(final)
    return { final }
}

const getRegistration = async (payload, userdetails) => {
    console.log(userdetails);
    const query = {
        isDeleted: false
    };
    const options = {
        sort: { createdAt: -1 }
    }
    return DAO.getData(Models.registration, query, {}, options);
}

const singleRegistration = async (payload, userdetails) => {
    let id = payload.id
    const query = {
        _id: id,
        isDeleted: false
    }
    let result = await DAO.getDataOne(Models.registration, query, {}, {});
    return result
}



module.exports = {
    register,
    getRegistration,
    singleRegistration
}
