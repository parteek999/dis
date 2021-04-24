
const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    TokenManager = require('../Libs/TokenManager'),
    Models = require('../Models'),
    Bcrypt = require('bcryptjs');
const mail = require('../DAOManager').mail;
var path = require('path');
let fs = require('fs');
 
const signUp = async (payload) => {
    const { email,name,password,countryCode,phoneNo } = payload
    let query = {
        email
    };
    let result = await DAO.getData(Models.Users, query, { _id: 1 }, {});
    if (result.length) {
        throw ERROR.EMAIL_ALREADY_EXIST;
    }
    payload.password = Bcrypt.hashSync(payload.password, Config.APP_CONSTANTS.SERVER.SALT);
    
    console.log("1212121212121212",payload)
    var number= (countryCode+phoneNo)

 var Data = {
     password:password,
     email:email,
     name:name,
     countryCode:countryCode,
     phoneNo:phoneNo,
     fullNo:number
     
 }
    const final = await DAO.saveData(Models.Users,Data );

    let tokenData = {
        scope: Config.APP_CONSTANTS.SCOPE.USER,
        _id:final._id,
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
      
        return { final }

    }
    catch (err) {
        throw err
    }
}



const resetPassword = async (request, reply) => {
    const { newpassword, confirmpassword } = request.payload

    // console.log(request.query)
    // var str = request.info.referrer;
    // const n = str.split("=")[1]
    // console.log(n)
    var pass = Bcrypt.hashSync(newpassword, Config.APP_CONSTANTS.SERVER.SALT);
    var b = request.query.id
    const a = { password: pass };
    const final = await DAO.findAndUpdate(Models.Users, { email: b }, a, { new: true });
    return
    // reply.file(path.join(__dirname, '../public/form1.html'))
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
const formSubmit = async (payload) => {
    const { fname,email,phoneNumber,about } = payload
    let query = {
        fname,email,phoneNumber,about
    }
    return {query}

}

module.exports = {
    signUp,
    login,
    resetPassword,
    forgetPassword,
    editProfile,
    changePassword,
    // renderapi,
    hello,
    create,
    bookMarked,
    formSubmit
}
