const { Model } = require('mongoose');

const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    TokenManager = require('../Libs/TokenManager'),
    Models = require('../Models'),
    Bcrypt = require('bcryptjs');
var upload = require('../Libs/uploadManager');



const getUserNotification = async (payload, userdetails) => {
    var id = userdetails._id;
    const options = {
        sort: { createdAt: -1 }
    }
var result =  await DAO.getData(Models.Notification, { userId: { $in: [id] } }, {}, options);

return result

}

module.exports = {
    getUserNotification,
}