const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    TokenManager = require('../Libs/TokenManager'),
    Models = require('../Models'),
    Bcrypt = require('bcryptjs');



const register = async (payload) => {
    // console.log(payload)
    const final = await DAO.saveData(Models.registration,payload)
      console.log(final)
      return { final }
}

module.exports = {
    register,

}
