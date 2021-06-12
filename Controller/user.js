const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    TokenManager = require('../Libs/TokenManager'),
    Models = require('../Models'),
    Bcrypt = require('bcryptjs');
let mail = require('../DAOManager').mail;
var upload = require('../Libs/uploadManager');
var path = require('path');
var email = require('../DAOManager/sendmail');
let fs = require('fs');


const signUp = async (payload) => {
    const { email, name, password, countryCode, phoneNo, deviceToken, deviceType } = payload
    let query = {
        email
    };
    let result = await DAO.getData(Models.Users, query, { _id: 1 }, {});
    if (result.length) {
        throw ERROR.EMAIL_ALREADY_EXIST;
    }
    pass = await Bcrypt.hashSync(password, Config.APP_CONSTANTS.SERVER.SALT);
    var number = await (countryCode + phoneNo)
    var Data = {
        password: pass,
        email: email,
        name: name,
        countryCode: countryCode,
        phoneNo: phoneNo,
        fullNo: number,
        deviceType: deviceType,
        deviceToken: deviceToken,
    }
    const User = await DAO.saveData(Models.Users, Data);
    const user = await DAO.getDataOne(Models.Users, query, { password: 0 }, {});
    let tokenData = {
        scope: Config.APP_CONSTANTS.SCOPE.USER,
        _id: User._id,
        time: new Date(),
    };
    const Token = await TokenManager.GenerateToken(tokenData, Config.APP_CONSTANTS.SCOPE.USER);
    return { user, Token }
}


const login = async (payload) => {
    try {
        const { email, password, deviceToken, deviceType } = payload;
        const query = {
            email: email
        };
        const result = await DAO.getDataOne(Models.Users, query, {});
        console.log("12121212", result)
        console.log("90990909090909090", payload)
        if (result === null) throw ERROR.EMAIL_NOT_FOUND;
        const checkPassword = Bcrypt.compareSync(password, result.password);
        if (!checkPassword) throw ERROR.INVALID_PASSWORDMATCH;
        if (result.deviceToken) {
            Response = await DAO.findAndUpdate(Models.Users, { email: email }, { deviceToken: deviceToken, deviceType: deviceType }, { new: true });
        }
        const user = await DAO.getDataOne(Models.Users, query, { password: 0 }, {});
        let tokenData = {
            scope: Config.APP_CONSTANTS.SCOPE.USER,
            _id: result._id,
            time: new Date(),
        };
        const Token = await TokenManager.GenerateToken(tokenData, Config.APP_CONSTANTS.SCOPE.USER);
        return { user, Token }
    }
    catch (err) {
        throw err
    }
}


const socialLogin = async (payload) => {
    const { email, name, deviceToken, deviceType, socialId } = payload
    const query = {
        socialId: payload.socialId,
        email: payload.email,
        isBlocked: false
    };
    var Data = {
        name:name,
        email: email,
        deviceType: deviceType,
        deviceToken: deviceToken,
        socialId: socialId
    }
    let result = await DAO.getDataOne(Models.Users, query, {});
    result !== null ? user = await DAO.findAndUpdate(Models.Users, { socialId: socialId }, { deviceToken: payload.deviceToken, deviceType: payload.deviceType }, { new: true }) : user = await DAO.saveData(Models.Users, Data);
    let tokenData = {
        scope: Config.APP_CONSTANTS.SCOPE.USER,
        _id: user._id,
        time: new Date(),
        // exp:Math.floor(Date.now() / 1000) + 1800
    };
    const Token = await TokenManager.GenerateToken(tokenData, Config.APP_CONSTANTS.SCOPE.USER);
    return {
        user,
        Token
      
    }
}


const changePassword = async (request, userDetails) => {
    const { newPassword, oldPassword } = request.payload
    const result = await DAO.getDataOne(Models.Users, { _id: userDetails._id })
    var checkPassword = await Bcrypt.compareSync(oldPassword, result.password)
    if (checkPassword === false) throw ERROR.INVALID_PASSWORDMATCH;
    const pass = await Bcrypt.hashSync(newPassword, Config.APP_CONSTANTS.SERVER.SALT);
    const final = await DAO.findAndUpdate(Models.Users, { _id: userDetails._id }, { password: pass }, { new: true });
    const user = await DAO.getData(Models.Users, { _id: userDetails._id }, { password: 0 }, {});
    console.log(final)
    return { user }
}


const editProfile = async (payload, userDetails) => {
    // console.log(payload.file)
    // console.log(payload['file'])
    if(payload['file']===undefined){
        var number = await(payload.countrycode + payload.phoneNo)
        var Data = {
            email: payload.email,
            name: payload.fullName,
            countryCode: payload.countrycode,
            phoneNo: payload.phoneNo,
            fullNo : number,

        }
        const user = await DAO.findAndUpdate(Models.Users, { _id: userDetails._id }, Data, { new: true });
       
       
        return {
           user
        }
    }
else{   
        let imgDetail = await upload.upload(payload)
        var number = await(payload.countrycode + payload.phoneNo)
        var Data = {
            email: payload.email,
            name: payload.fullName,
            countryCode: payload.countrycode,
            phoneNo: payload.phoneNo,
            profilePic:imgDetail,
            fullNo : number
        }
        const user = await DAO.findAndUpdate(Models.Users, { _id: userDetails._id }, Data, { new: true });
       
        return {
            user
        }
    }
}



const forgetPassword = async (payload, userdetail) => {
    let query = {
        email: payload.email
    }
    // console.log(payload.email)
    const result = await DAO.getDataOne(Models.Users, query)
    console.log(result, query)
    if (result == null) throw ERROR.EMAIL_NOT_FOUND
    await email(payload.email, result._id)
    return { message: "A reset password link is sent to your registered email address" }
}



const resetPassword = async (payload, userId, h) => {
    let { password } = payload
    let query = { _id: userId.id }
    console.log(userId.id)
    password = Bcrypt.hashSync(password, Config.APP_CONSTANTS.SERVER.SALT);
    const result = await DAO.findAndUpdate(Models.User, query, { password: password })
    console.log("hi")
    // return reply.view('passwordChanged')
    return h.redirect("/user/renderConfirmPage")
}



const forgotPasswordPageRender = async (request, reply) => {
    console.log(request.id)
    return reply.view('form', { name: request.id })
}



const renderConfirmPage = async (request, reply) => {
    return reply.view('form1')
}



const termsAndConditionPage = async (request, reply) => {
    return reply.view('terms')
}


const faqPage = async (request, reply) => {
    return reply.view('faq')
}


const bookMarked = async (payload, userDetails) => {
    console.log("hello")
    const { article_Id, mark } = payload
    if (mark == 1) {
        final = await DAO.findAndUpdate(Models.Users, { _id: userDetails._id }, { $push: { article_Id: article_Id } }, { new: true });
        console.log("hi")
    }
    else if (mark == 0) {
        console.log("hi there");
        final = await DAO.findAndUpdate(Models.Users, { _id: userDetails._id }, { $pull: { article_Id: article_Id } }, { new: true });
    }
    else {
        throw "invalid mark";
    }
    return final
}



const bookmarkedId = async (payload, userDetails) => {
    console.log(payload)
    let query = {
        _id: { '$in': payload.article_Id },
        isDeleted: false
    };
    let final = await DAO.getData(Models.news, query, {}, {});

    return final
}



const formSubmit = async (payload) => {
    const { fname, email, phoneNumber, about } = payload
    let query = {
        fname, email, phoneNumber, about
    }
    return { query }
}


module.exports = {
    signUp,
    login,
    socialLogin,
    changePassword,
    forgetPassword,
    editProfile,
    resetPassword,
    renderConfirmPage,
    bookMarked,
    bookmarkedId,
    formSubmit,
    forgotPasswordPageRender,
    termsAndConditionPage,
    faqPage
}
