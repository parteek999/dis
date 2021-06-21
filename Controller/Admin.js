

const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    TokenManager = require('../Libs/TokenManager'),
    Models = require('../Models'),
    Bcrypt = require('bcryptjs');
var upload = require('../Libs/uploadManager');


const Login = async (payload) => {
    try {
        const { email, password } = payload;
        //  query = {
        //     email:email
        // };
    //    var final =await DAO.getData(Models.Admin,query,{},{});
    //         console.log(final)

        var final = await Models.Admin.findOne();   
        console.log(final) 
        const checkPassword = Bcrypt.compareSync(password, final.password); //compare password string to encrypted string

        if (!checkPassword) throw ERROR.INVALID_CREDENTIALS;

        let tokenData = {
            scope: Config.APP_CONSTANTS.SCOPE.ADMIN,
            _id: final._id,
            time: new Date(),
            // exp:Math.floor(Date.now() / 1000) + 1800
        };
        const accessToken = await TokenManager.GenerateToken(tokenData, Config.APP_CONSTANTS.SCOPE.ADMIN);
        return {
            accessToken
        }
    }
    catch (err) {
        throw err
    }
}

const changePassword = async (request, userDetails) => {

    let { oldPasword, newPassword } = request
    console.log(oldPasword, newPassword)

    const result = await DAO.getDataOne(Models.Admin, { _id: userDetails._id })

    console.log(result.password)

    var checkPassword = await Bcrypt.compareSync(oldPasword, result.password)

    console.log(checkPassword)
    if (checkPassword === false) throw ERROR.INVALID_PASSWORDMATCH;
    const pass = await Bcrypt.hashSync(newPassword, Config.APP_CONSTANTS.SERVER.SALT);

    const final = await DAO.findAndUpdate(Models.Admin, { _id: userDetails._id }, { password: pass }, { lean: true, upsert: true, new: true });

    console.log(final)

    return { final }

}

const userCount = async (payload, userDetails) => {

    // let Data = await DAO.getData(Models.Users);
    let result = Models.Users.find({}).count()

    return result
}

const paginateUser = async (payload, userDteails) => {
    let { limit, pageNo } = payload
    console.log(limit, pageNo)
    let page = pageNo - 1
    const options = {
        sort: { createdAt: -1 },
        skip: page * limit,
        // pageNO*limit
        // ,
        limit: 10
    }
    let result = await DAO.getData(Models.Users, {}, {}, options);
    console.log(result)
    return result
}

const getUser = async (payload, userDetails) => {
    const options = {
        sort: { createdAt: -1 },
        limit: 10
    }
    return DAO.getData(Models.Users, {}, {}, options);
}

const singleUser = async (payload, userDetails) => {
    console.log("1212121212", payload.id)

    const query = {
        _id: payload.id
    }
    let final = await DAO.getDataOne(Models.Users, query, {}, {})
    return final
}

const article = async (payload) => {
    try {

        const query = {
            email
        };
        const result = await DAO.getDataOne(Models.Admin, query);
        if (result === null) throw ERROR.INVALID_CREDENTIALS;
        const checkPassword = Bcrypt.compareSync(password, result.password); //compare password string to encrypted string

        if (!checkPassword) throw ERROR.INVALID_CREDENTIALS;

        let tokenData = {
            scope: Config.APP_CONSTANTS.SCOPE.ADMIN,
            _id: result._id,
            time: new Date(),
            // exp:Math.floor(Date.now() / 1000) + 1800
        };
        const accessToken = await TokenManager.GenerateToken(tokenData, Config.APP_CONSTANTS.SCOPE.ADMIN);
        return {
            accessToken
        }
    }
    catch (err) {
        throw err
    }
}

const blockunblockUser = async (payload) => {
    console.log("121121212121", payload.id)
    let query = { _id: payload.id }
    // let data;
    let result = await DAO.getDataOne(Models.Users, query)
    console.log(result)
    if (result.isBlocked === false) {
        data = { isBlocked: true }
        return final = await DAO.findAndUpdate(Models.Users, query, data, { new: true })
    }
    else {
        data = { isBlocked: false }
        return final = await DAO.findAndUpdate(Models.Users, query, data, { new: true })
    }
}

const uploadImages = async (payload, userDetail) => {
    console.log(payload)
    const { title, description } = payload
    let imgDetail = await upload.upload(payload)
    console.log("3434343", imgDetail)
    var Data = {
        title: title,
        description: description,
        image: imgDetail,
    }
    let result = await DAO.saveData(Models.rights, Data)
    return result
}


const addContent = async (payload, ) => {
    const {Type,Content} = payload;
    let result = await DAO.saveData(Models.pages,payload)
    return result
}


const editContent = async (payload) => {
    const {Type,Content,id} = payload;
    let result = await DAO.findAndUpdate(Models.pages,{_id:id},payload,{});
    return result
}


const getPages = async (payload) => {
    // const {Type,Content,id} = payload;
    let result = await DAO.getData(Models.pages);
    return result
}


const getSinglePage = async (payload) => {
    // const {Type,Content,id} = payload;
    let result = await DAO.getDataOne(Models.pages,{_id:payload.id});
    return result
}



module.exports = {

    Login,
    changePassword,
    userCount,
    getUser,
    article,
    singleUser,
    blockunblockUser,
    paginateUser,
    uploadImages,
    addContent,
    getPages,
    editContent,
    getSinglePage


}