
const DAO = require('../DAOManager').queries,
Config = require('../Config'),
ERROR = Config.responseMessages.ERROR,
UniversalFunctions = require('../Utils/UniversalFunctions'),
TokenManager = require('../Libs/TokenManager'),
Models = require('../Models'),
Bcrypt = require('bcryptjs'),
request = require("request");

const {sendPushNotification} = require('../Libs/notification');

const mongoose = require('mongoose');

const signup = async (payload) => {
    //  console.log(payload.password),
    //  console.log(payload.verifypassword)
     
     let query = {
       email : payload.email
    };
    let result = await DAO.getData(Models.Users,query,{_id:1},{limit:1});
    
    if(result.length){
       throw ERROR.EMAIL_ALREADY_EXIST;
   }
   if(payload.password!=payload.verifypassword){
    throw  ERROR.INVALID_PASSWORDMATCH;
}
    payload.password = Bcrypt.hashSync(payload.password, Config.APP_CONSTANTS.SERVER.SALT);
    // payload.loginType = Config.APP_CONSTANTS.DATABASE_CONSTANT.ACCOUNT_TYPE.EMAIL;
    result = await DAO.saveData(Models.Users,payload);

    return {
        payload
                 }
}
const  login= async (payload)=> {

    try {
        const { email, password } = payload;
        // console.log(email);
        // console.log(password);
 
        const query = {
            email,
           
         };
 
       const result = await DAO.getDataOne(Models.Users,query,{});
    //    console.log(result);
 
      
       if(result === null ) throw ERROR.INVALID_CREDENTIALS;
       const checkPassword = Bcrypt.compareSync(password, result.password); //compare password string to encrypted string
 
       if(!checkPassword) throw ERROR.INVALID_PASSWORDMATCH;
 
       let tokenData={
         scope:Config.APP_CONSTANTS.SCOPE.USER,
         _id:result._id,
         time:new Date(),
         
     };
          const accessToken = await TokenManager.GenerateToken(tokenData,Config.APP_CONSTANTS.SCOPE.USER);
 
              return {
                 accessToken,
                 
             }
 }
     catch (err){
         throw err
     }
 }
module.exports={
    signup,login
}