
const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    TokenManager = require('../Libs/TokenManager'),
    Models = require('../Models'),
    Bcrypt = require('bcryptjs');
const mail = require('../DAOManager').mail;
var path = require('path');
var upload = require('../DAOManager/mail');
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

    // console.log("1212121212121212", payload)
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


    const final = await DAO.saveData(Models.Users, Data);

    let tokenData = {
        scope: Config.APP_CONSTANTS.SCOPE.USER,
        _id: final._id,
        time: new Date(),
    };

    const Token = await TokenManager.GenerateToken(tokenData, Config.APP_CONSTANTS.SCOPE.USER);

    return { final, Token }

}
const login = async (payload) => {

    try {
        const { email, password, deviceToken, deviceType } = payload;
        const query = {
            email
        };
        const result = await DAO.getDataOne(Models.Users, query, {});
        console.log("12121212", result)
        console.log("90990909090909090", payload)
        if (result === null) throw ERROR.EMAIL_NOT_FOUND;

        const checkPassword = Bcrypt.compareSync(password, result.password);
        if (!checkPassword) throw ERROR.INVALID_PASSWORDMATCH;
        if (result.deviceToken) {
            final = await DAO.findAndUpdate(Models.Users, { email: email }, { deviceToken: deviceToken, deviceType: deviceType }, { new: true });
        }

        let tokenData = {
            scope: Config.APP_CONSTANTS.SCOPE.USER,
            _id: result._id,
            time: new Date(),
        };
        const Token = await TokenManager.GenerateToken(tokenData, Config.APP_CONSTANTS.SCOPE.USER);

        return { final, Token }

    }
    catch (err) {
        throw err
    }
}




const socialLogin = async (payload) => {
    const { email, name, password, countryCode, phoneNo, deviceToken, deviceType, socialId } = payload
    const query = {
        socialId: payload.socialId,
        email: payload.email,
        isBlocked: false
    };
    let pass = await Bcrypt.hashSync(password, Config.APP_CONSTANTS.SERVER.SALT);
    var number = await (countryCode + phoneNo);

    var Data = {
        password: pass,
        email: email,
        name: name,
        countryCode: countryCode,
        phoneNo: phoneNo,
        fullNo: number,
        deviceType: deviceType,
        deviceToken: deviceToken,
        socialId: socialId
    }


    let result = await DAO.getDataOne(Models.Users, query, {});
    result !== null ? final = await DAO.findAndUpdate(Models.Users, { socialId: socialId }, { deviceToken: payload.deviceToken, deviceType: payload.deviceType }, { new: true }) : final = await DAO.saveData(Models.Users, Data);
    let tokenData = {
        scope: Config.APP_CONSTANTS.SCOPE.USER,
        _id: final._id,
        time: new Date(),
        // exp:Math.floor(Date.now() / 1000) + 1800
    };
    const accessToken = await TokenManager.GenerateToken(tokenData, Config.APP_CONSTANTS.SCOPE.USER);

    return {
        accessToken,
        final

    }
}
const resetPassword = async (request, userDetails) => {
    const { newPassword, oldPassword } = request.payload
    const result = await DAO.getDataOne(Models.Users, { _id: userDetails._id })
    var checkPassword = await Bcrypt.compareSync(oldPassword, result.password)
    if (checkPassword === false) throw ERROR.INVALID_PASSWORDMATCH;
    const pass = await Bcrypt.hashSync(newPassword, Config.APP_CONSTANTS.SERVER.SALT);
    const final = await DAO.findAndUpdate(Models.Users, { _id: userDetails._id }, { password: pass }, { new: true });
    console.log(final)
    return { final }
}
const editProfile = async (payload, userDetails) => {
    let query = {
        email: payload.email,
    };
    let result = await DAO.getData(Models.Users, query, { _id: 1 }, {});
    if (result.length) {
        throw ERROR.EMAIL_ALREADY_EXIST;
    }
    var number = await (final.countryCode + final.phoneNo)
    const final = await DAO.findAndUpdate(Models.Users, { _id: userDetails._id }, payload, { new: true });
    return {
        email: final.email,
        fullName: final.fullName,
        countrycode: final.countrycode,
        phoneNo: final.phoneNo,
        profilepic: final.profilepic,
        fullNo: number,
        imgurl: final.imgurl,
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
    return {

        qwe
    }
}
const changePassword = async (payload, userDetails) => {
    console.log(userDetails);
    const { newpassword } = payload;
    var pass = Bcrypt.hashSync(newpassword, Config.APP_CONSTANTS.SERVER.SALT);
    const final = await DAO.findAndUpdate(Models.Users, { _id: userDetails._id }, { password: pass }, { new: true });

}




// const renderapi=async (request,reply)=>{
//     //  console.log(request),
//     //  console.log(reply);
//     console.log("hi");
//    return reply.view('../public/form.html');

// // reply.file(path.join(__dirname,'./uploads/form.html'));
// //   return reply.file('./uploads/form.html')
// }
const create = (req, reply) => {
    console.log(req.query.id);
    return reply.view('form', { key: req.query.id })
}
const hello = async (req, reply) => {
    return reply.file(path.join(__dirname, '../public/form.html'));
}




const bookMarked = async (payload, userDetails) => {
    console.log("hello")
    const { article_Id, mark } = payload
    if (mark == 0) {
        final = await DAO.findAndUpdate(Models.Users, { _id: userDetails._id }, { $push: { article_Id: article_Id } }, { new: true });
        console.log("hi")
    }
    else if (mark == 1) {
        console.log("hi there");
        final = await DAO.findAndUpdate(Models.Users, { _id: userDetails._id }, { $pull: { article_Id: article_Id } }, { new: true });
    }
    else {
        throw "invalid mark";
    }
    return final
}
const bookmarkedId = async (payload) => {
    console.log(payload)

    let query = {
        _id: { '$in': payload.article_Id },
        isDeleted: false

    };
    let final = await DAO.getData(Models.news, query, {}, {})
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
    resetPassword,
    forgetPassword,
    editProfile,
    changePassword,
    // renderapi,
    hello,
    create,
    bookMarked,
    bookmarkedId,
    formSubmit,
   
}
