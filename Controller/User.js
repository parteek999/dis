/**
 * Created by Shumi on 17/3/20.
 */

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

    const ObjectId = mongoose.Types.ObjectId;
const  Login= async (payload)=> {

   try {
       const { email, password } = payload;

       const query = {
           email,
           loginType:  Config.APP_CONSTANTS.DATABASE_CONSTANT.ACCOUNT_TYPE.EMAIL,
           isBlocked: false

       };

      const result = await DAO.getDataOne(Models.Users,query,{});

      
      if(result === null ) throw ERROR.INVALID_CREDENTIALS;
      const checkPassword = Bcrypt.compareSync(password, result.password); //compare password string to encrypted string

      if(!checkPassword) throw ERROR.INVALID_CREDENTIALS;

      let tokenData={
        scope:Config.APP_CONSTANTS.SCOPE.USER,
        _id:result._id,
        time:new Date(),
        // exp:Math.floor(Date.now() / 1000) + 1800
    };

   
      const accessToken = await TokenManager.GenerateToken(tokenData,Config.APP_CONSTANTS.SCOPE.USER);

            
            return {
                accessToken,
                user:{
                _id: result._id,    
                firstName:result.firstName,
                lastName:result.lastName,
                loginType:result.loginType,
                socialId:result.socialId,
                email:result.email,
                gender:result.gender,
                dob:result.dob,
                phoneNo:result.phoneNo,
                profilePicURL:result.profilePicURL,
                }
            }

   }
    catch (err){
        throw err
    }
}


const SignUp = async (payload) => {

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
        // exp:Math.floor(Date.now() / 1000) + 1800
    };

   
      const accessToken = await TokenManager.GenerateToken(tokenData,Config.APP_CONSTANTS.SCOPE.USER);
            
            return {
                accessToken,
                user:{
                    ...payload
                }
            }
}


const SocialLogin = async (payload) => {

    const query = {
        socialId: payload.socialId,
        loginType:  payload.loginType,
        isBlocked: false

    };

   let result = await DAO.getDataOne(Models.Users,query,{_id:1});

   if(result === null){

    result = await DAO.saveData(Models.Users,payload);
    
    }
    

    let tokenData={
        scope:Config.APP_CONSTANTS.SCOPE.USER,
        _id:result._id,
        time:new Date(),
        // exp:Math.floor(Date.now() / 1000) + 1800
    };

   
      const accessToken = await TokenManager.GenerateToken(tokenData,Config.APP_CONSTANTS.SCOPE.USER);
            
            return {
                accessToken,
                user:{
                ...payload
                }
            }

}



const  UpdateUser= async (payload, userDetails)=> {

    try {
       
        let query = {
            isBlocked: false,
            _id : userDetails._id
        };

       const result = await DAO.getData(Models.Users,query,{},{limit:1});

       if(!result.length){
           throw ERROR.User_NOT_FOUND;
       }

       if(payload.password){
        payload.password = Bcrypt.hashSync(payload.password, Config.APP_CONSTANTS.SERVER.SALT);
       }

       const data = await DAO.findAndUpdate(Models.Users,{_id:userDetails._id}, payload,{new: true});


       return {
        firstName:data.firstName,
        lastName:data.lastName,
        loginType:data.loginType,
        socialId:data.socialId,
        email:data.email,
        gender:data.gender,
        dob:data.dob,
        phoneNo:data.phoneNo,
        profilePicURL:data.profilePicURL,
    };

    }
     catch (err){
         throw err
     }
 }

 const GetUser = (payload, userDetails) => {

    return DAO.getDataOne(Models.Users,{_id:userDetails._id},{password:0, deviceToken:0, isBlocked:0, deviceType:0});
 };




 const SendNotification = async(payload, userDetails) => {

    const message = {
        message:payload.message,
        type: 2
      }
      const deviceToken = await DAO.getUniqueData(Models.Users,{deviceToken:{$ne:null}},{},{},'deviceToken')
      sendPushNotification(message,deviceToken);
 }
 
module.exports = {
    Login,
    UpdateUser,
    GetUser,
    SignUp,
    SocialLogin,
    SendNotification,
    // ratings
};