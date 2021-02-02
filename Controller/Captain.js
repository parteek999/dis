/**
 * Created by Shumi on 17/3/20.
 */

const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    Common = require('./Common'),
    ERROR = Config.responseMessages.ERROR,
    UniversalFunctions = require('../Utils/UniversalFunctions'),
    TokenManager = require('../Libs/TokenManager')
    Models = require('../Models'),
    Bcrypt = require('bcryptjs'),
    request = require("request");


const  Login= async (payload)=> {

   try {
       const { email, password } = payload;

       const query = {
           email,
           isBlocked: false

       };

      const result = await DAO.getDataOne(Models.Captain,query,{});

      
      if(result === null ) throw ERROR.INVALID_CREDENTIALS;
      const checkPassword = Bcrypt.compareSync(password, result.password); //compare password string to encrypted string

      if(!checkPassword) throw ERROR.INVALID_CREDENTIALS;

      let tokenData={
        scope:Config.APP_CONSTANTS.SCOPE.CAPTAIN,
        _id:result._id,
        time:new Date(),
        // exp:Math.floor(Date.now() / 1000) + 1800
    };

      const table = await DAO.getUniqueData(Models.Table,{captain: result._id, isBlocked: false},{},{},'name');
   
      const accessToken = await TokenManager.GenerateToken(tokenData,Config.APP_CONSTANTS.SCOPE.CAPTAIN);

            
            return {
                accessToken,
                table,
                branchId: result.branchId[0],
                user:{
                _id: result._id,    
                name:result.name,
                
                }
            }

   }
    catch (err){
        throw err
    }
}


const CreateCaptain = async (payload, userDetails) => {

    let query = {
        isBlocked: false,
        email : payload.email
    };
   let result = await DAO.getData(Models.Captain,query,{_id:1},{limit:1});

   if(result.length){
       throw ERROR.EMAIL_ALREADY_EXIST;
   }

   payload.branchId = userDetails._id;

   const password = Math.round(Math.random()*100).toString();
    payload.password = Bcrypt.hashSync(password, Config.APP_CONSTANTS.SERVER.SALT);
    const {_doc: savedData}  = await DAO.saveData(Models.Captain,payload);

    
            
    return savedData;

}

const  UpdateCaptain = async (payload, userDetails)=> {

    try {

        // console.log("=============payload==============", payload)
       
        let query = {
            isBlocked: false,
        };

        if(userDetails.scope === Config.APP_CONSTANTS.SCOPE.BRANCH){
            query._id = payload._id;
        }
        else{
            query._id = userDetails._id;
        }

       const result = await DAO.getData(Models.Captain,query,{},{limit:1});

       if(!result.length){
           throw ERROR.User_NOT_FOUND;
       }

       if(payload.password){
        payload.password = Bcrypt.hashSync(payload.password, Config.APP_CONSTANTS.SERVER.SALT);
       }

       if(userDetails.scope === Config.APP_CONSTANTS.SCOPE.BRANCH){
        payload.isBlocked = true;
    }

    // console.log("=============payload==============", payload)

       await DAO.findAndUpdate(Models.Captain,{_id:query._id}, payload,{});


       return null;

    }
     catch (err){
         throw err
     }
 }

 const GetCaptain = (payload, userDetails) => {

    return DAO.getData(Models.Captain,{isBlocked: false, branchId:userDetails._id},{password:0, deviceToken:0, isBlocked:0, deviceType:0});
 }

module.exports = {
    Login,
    UpdateCaptain,
    GetCaptain,
    CreateCaptain
};