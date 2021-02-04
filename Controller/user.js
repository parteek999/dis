
const DAO = require('../DAOManager').queries,
Config = require('../Config'),
ERROR = Config.responseMessages.ERROR,
TokenManager = require('../Libs/TokenManager'),
Models = require('../Models'),
Bcrypt = require('bcryptjs'),
Libs=require('../Libs/notification');


const signup = async (payload) => {
    const { email} = payload
     let query = {
       email 
    };
    let result = await DAO.getData(Models.Users,query,{_id:1},{limit:1});
    console.log(result);
    if(result.length){
       throw ERROR.EMAIL_ALREADY_EXIST;
   }
    
//    if(payload.password!=payload.verifypassword){
//     throw  ERROR.INVALID_PASSWORDMATCH;
// }

    payload.password = Bcrypt.hashSync(payload.password, Config.APP_CONSTANTS.SERVER.SALT);
    result = await DAO.saveData(Models.Users,payload);
    Libs.otp()
    return {
        payload
                 }
}
const  login= async (payload)=> {

    try {
        const { email, password } = payload;
      const query = {
            email,
           
         };
 
       const result = await DAO.getDataOne(Models.Users,query,{});
   
       if(result === null ) throw ERROR.INVALID_CREDENTIALS;
       const checkPassword = Bcrypt.compareSync(password, result.password); 
       
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
// const otp = async (payload) => {
//     const {otp} = payload
//      let query = {
//        otp 
//     };
    
//     let result= await Libs.otp()
// //    if(payload.password!=payload.verifypassword){
// //     throw  ERROR.INVALID_PASSWORDMATCH;
// // }

//     payload.password = Bcrypt.hashSync(payload.password, Config.APP_CONSTANTS.SERVER.SALT);
//     result = await DAO.saveData(Models.Users,payload);

//     return {
//         payload
//                  }
// }
module.exports={
    signup,
    login
}