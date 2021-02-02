const DAO = require('../DAOManager').queries
const Models = require('../Models');
const Config = require('../Config');
const ERROR = Config.responseMessages.ERROR;
const Bcrypt = require('bcryptjs');
const TokenManager = require('../Libs/TokenManager');

const part = async (payload) => {

    let query = { email : payload.email};
   let result = await DAO.getData(Models.user1,query,{_id:1},{limit:1});
    console.log(result)
   if(result.length){
       throw ERROR.EMAIL_ALREADY_EXIST;
   }
   payload.password = Bcrypt.hashSync(payload.password,1);
//    console.log(payload)
//    console.log(payload.password)
result = await DAO.saveData(Models.user1,payload);
   let tokenData={
    scope:Config.APP_CONSTANTS.SCOPE.USER,
    _id:result._id,
    time:new Date(),
    // exp:Math.floor(Date.now() / 1000) + 1800
};


  const accessToken = await TokenManager.GenerateToken(tokenData,Config.APP_CONSTANTS.SCOPE.USER);
 
  
return {result,accessToken}
}
module.exports={part}

