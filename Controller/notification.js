const { Model } = require('mongoose');

const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    TokenManager = require('../Libs/TokenManager'),
    Models = require('../Models'),
    Bcrypt = require('bcryptjs');
var upload = require('../Libs/uploadManager');



const getUserNotification = async (payload, userdetails) => {
    // console.log(userdetails);
    var userdetails = "60ca0120a67bbb331329b1ee";
    console.log(userdetails._id)
    const options = {
        sort: { createdAt: -1 }
    }
    
var result =  await DAO.getData(Models.Notification, { userId: { $in: [userdetails] } }, {}, options);
console.log(result)

return result

}




module.exports = {
    getUserNotification,
}