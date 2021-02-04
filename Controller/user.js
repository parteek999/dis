
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

    let query = {
        isBlocked: false,
        email : payload.email
    };
   let result = await DAO.getData(Models.Users,query,{_id:1},{limit:1});

   if(result.length){
       throw ERROR.EMAIL_ALREADY_EXIST;
   }

    payload.password = Bcrypt.hashSync(payload.password, Config.APP_CONSTANTS.SERVER.SALT);
    payload.loginType = Config.APP_CONSTANTS.DATABASE_CONSTANT.ACCOUNT_TYPE.EMAIL;
    result = await DAO.saveData(Models.Users,payload);


    let tokenData={
        scope:Config.APP_CONSTANTS.SCOPE.USER,
        _id:result._id,
        time:new Date(),
       
    };

   
      const accessToken = await TokenManager.GenerateToken(tokenData,Config.APP_CONSTANTS.SCOPE.USER);
            
            return {
                accessToken,
                user:{
                    ...payload
                }
            }
}
module.exports={
    signup
}