const { Model } = require('mongoose');

const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    TokenManager = require('../Libs/TokenManager'),
    Models = require('../Models'),
    Bcrypt = require('bcryptjs');
var upload = require('../Libs/uploadManager');

const addRights = async (payload, userDetail) => {
    console.log(payload)
    const { title, description } = payload
    var Data = {
        title: title,
        description: description,
    }
    let result = await DAO.saveData(Models.rights, Data)
    return result
}

const getRights = async (payload, userdetails) => {
    console.log(userdetails);
    const query = {
        isDeleted: false
    };
    const options={
        sort:{createdAt:-1}
    }
    return DAO.getData(Models.rights, query,{},options);
}

const singleRights = async (payload, userdetails) => {
    // console.log("12121212121212",payload)
    let id = payload.id
    const query = {
        _id: id,
        isDeleted: false
    }
    console.log(query)
    let result = await DAO.getDataOne(Models.rights, query, {}, {});
    return result
}


const deleteRights = async (payload, userdetails) => {
    let id = payload.id
    const query = {
        _id: id,
    }
    console.log(query)
    let result = await DAO.findAndUpdate(Models.rights, query, { isDeleted: true }, { new: true })
    return result
}

// const deleteRights = async (payload) => {
//     console.log("121121212121", payload.id)
//     let query = { _id: payload.id }
//     // let data;
//     let result = await DAO.getDataOne(Models.rights, query)
//     console.log(result)
//     if (result.isDeleted === false) {
//         data = { isDeleted: true }
//         return final = await DAO.findAndUpdate(Models.rights, query, data, { new: true })
//     }
//     data = { isDeleted: false }
//     return final = await DAO.findAndUpdate(Models.rights, query, data, { new: true })
// }



module.exports = {
    addRights,
    getRights,
    singleRights,
    deleteRights
}