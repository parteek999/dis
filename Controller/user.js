
const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    TokenManager = require('../Libs/TokenManager'),
    Models = require('../Models'),
    Bcrypt = require('bcryptjs');
const mail = require('../DAOManager').mail;



const signup = async (payload) => {
    const { email } = payload
    let query = {
        email
    };

    let result = await DAO.getData(Models.Users, query, { _id: 1 }, {});
    if (result.length) {
        throw ERROR.EMAIL_ALREADY_EXIST;
    }
    payload.password = Bcrypt.hashSync(payload.password, Config.APP_CONSTANTS.SERVER.SALT);
    const final = await DAO.saveData(Models.Users, payload);

    let tokenData = {
        scope: Config.APP_CONSTANTS.SCOPE.USER,
        _id: result._id,
        time: new Date(),
    };
    const Token = await TokenManager.GenerateToken(tokenData, Config.APP_CONSTANTS.SCOPE.USER);

    return { final, Token }

}
const login = async (payload) => {

    try {
        const { email, password } = payload;
        const query = {
            email
        };
        const final = await DAO.getDataOne(Models.Users, query, {});

        if (final === null) throw ERROR.EMAIL_NOT_FOUND;

        const checkPassword = Bcrypt.compareSync(password, final.password);
        if (!checkPassword) throw ERROR.INVALID_PASSWORDMATCH;

        let tokenData = {
            scope: Config.APP_CONSTANTS.SCOPE.USER,
            _id: final._id,
            time: new Date(),
        };
        const Token = await TokenManager.GenerateToken(tokenData, Config.APP_CONSTANTS.SCOPE.USER);
        return { final, Token }

    }
    catch (err) {
        throw err
    }
}
const changePassword = async (request, userDetails) => {
    const { newpassword, confirmpassword } = request.payload
    console.log(request.query)
    var str = request.info.referrer;
    const n = str.split("=")[1]
    console.log(n)

    if (newpassword === confirmpassword) {
        console.log("not here")

        // var Pass = Bcrypt.hashSync(newpassword, Config.APP_CONSTANTS.SERVER.SALT);
        console.log("here too");
        const final = await DAO.findAndUpdate(Models.Users, {email:n}, { password: newpassword }, { new: true });
        console.log("here");
    }

    else {
        throw "password dosent match"
    }
    return {
        
    }
}
const forgetPassword = async (payload, userDetails) => {
    const { email } = payload
    let query = {
        email
    };
    let result = await DAO.getData(Models.Users, query, {}, {});

    if (result === null) {
        throw "email dosen't exist";
    }
    const qwe = await mail.sentmail(email);

    // console.log(qwe)
    // const newPassword = Bcrypt.hashSync(qwe, Config.APP_CONSTANTS.SERVER.SALT);
    // const final = await DAO.findAndUpdate(Models.Users, { email: email }, { password: newPassword }, { new: true });


    return {
        //    final
        qwe
    }
}
const editProfile = async (payload, userDetails) => {

    let query = {
        email: payload.email,
    };
    let result = await DAO.getData(Models.Users, query, { _id: 1 }, {});
    if (result.length) {
        throw ERROR.EMAIL_ALREADY_EXIST;
    }
    const final = await DAO.findAndUpdate(Models.Users, { _id: userDetails._id }, payload, { new: true });
    return {
        email: final.email,
        fullName: final.fullName,
        countrycode: final.countrycode,
        phoneNo: final.phoneNo,
        profilepic: final.profilepic,
        imgurl: final.imgurl,
        deviceType: final.deviceType,
        deviceToken: final.deviceToken,


    }
}

module.exports = {
    signup,
    login,
    changePassword,
    forgetPassword,
    editProfile
}