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

const singleArticle = async (payload, userdetails) => {

   // console.log("12121212121212",payload)
    // console.log(userdetails);
    //console.log("23232323232",payload.id)
    let  id = payload.id
    //console.log("sdsddd",id)
    const query = {
        _id:id,
        isDeleted: false
    }
    console.log(query)
    let result=await DAO.getDataOne(Models.news, query,{},{});
    
    return result
}

const deleteArticle = async (payload,userdetails)=>{
    let id = payload.id
    const query = {
        _id:id,
    }
    let result=await DAO.findAndUpdate(Models.news, query,{ isDeleted:true},{new:true})

    return result 
}





module.exports = {
    news, 
    getArticle,
    singleArticle,
    deleteArticle
}