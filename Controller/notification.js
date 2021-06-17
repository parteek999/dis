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
    console.log(userdetails._id)
    const options={
        sort:{createdAt:-1}
    }
    return DAO.getData(Models.Notification, {},{},options);
}




module.exports = {
    getUserNotification,
}