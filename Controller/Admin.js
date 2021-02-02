/**
 * Created by Shumi on 17/3/20.
 */

const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    Common = require('./Common'),
    UniversalFunctions = require('../Utils/UniversalFunctions'),
    TokenManager = require('../Libs/TokenManager')
    Models = require('../Models'),
    Bcrypt = require('bcryptjs'),
    request = require("request");


const  Login= async (payload)=> {

   try {
       const { email, password } = payload;

       const query = {
           email
       };

      const result = await DAO.getDataOne(Models.Admins,query);
      if(result === null ) throw ERROR.INVALID_CREDENTIALS;
      const checkPassword = Bcrypt.compareSync(password, result.password); //compare password string to encrypted string

      if(!checkPassword) throw ERROR.INVALID_CREDENTIALS;

      let tokenData={
        scope:Config.APP_CONSTANTS.SCOPE.ADMIN,
        _id:result._id,
        time:new Date(),
        // exp:Math.floor(Date.now() / 1000) + 1800
    };

   
      const accessToken = await TokenManager.GenerateToken(tokenData,Config.APP_CONSTANTS.SCOPE.ADMIN);
            
            return {
                accessToken
            }

   }
    catch (err){
        throw err
    }
}


const  CreateBranch= async (payload)=> {

    try { 
        let query = {
            isBlocked: false,
            email : payload.email
        };
        if(payload._id){
            query._id = {$ne:payload._id}
        }
       const result = await DAO.getData(Models.Branchs,query,{_id:1},{limit:1});

       if(result.length){
           throw ERROR.EMAIL_ALREADY_EXIST;
       }
       if(payload._id){

        return await DAO.findAndUpdate(Models.Branchs,{_id: payload._id},payload,{new: true})
 
     }
     else{
        const password =  Common.RandomPassword();
        payload.password = Bcrypt.hashSync(password, Config.APP_CONSTANTS.SERVER.SALT);
        const {_doc: savedData} = await DAO.saveData(Models.Branchs,payload);

            return {
                ...savedData,
                password: undefined
               };
     }
        
    
       

    }
     catch (err){
         throw err
     }
 }


 
const  UpdateBranch= async (payload)=> {

    try {
       
        let query = {
            isBlocked: false,
            _id : payload._id
        };

       const result = await DAO.getData(Models.Branchs,query,{_id:1},{limit:1});

       if(!result.length){
           throw ERROR.BRANCH_NOT_FOUND;
       }

        await DAO.findAndUpdate(Models.Branchs,{_id:payload._id}, payload);


       return null;

    }
     catch (err){
         throw err
     }
 }

 const GetBranch = (payload) => {

    const populateData = [{
        path: 'city',
        select: 'name _id',
        options: {},
        model:Models.Citys
    }]
    return DAO.populateData(Models.Branchs,{isBlocked: false},{password:0},{},populateData);
 }

 const DeleteBranch = async (payload) => {
     await DAO.findAndUpdate(Models.Branchs,{_id: payload._id}, {isBlocked: payload.isBlocked})
 }


 

module.exports = {
    Login,
    CreateBranch,
    UpdateBranch,
    GetBranch,
    DeleteBranch,
   
    
};