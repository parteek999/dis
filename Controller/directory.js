const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    Models = require('../Models');
var upload = require('../Libs/uploadManager');

const directory = async (payload) => {

    const { directoryName,
        aboutDirectory,
        phoneNO,
        address,
        website,
        startTime,
        endTime,
        facebookLInk,
        instagramLInk,
        twitterLink
    } = payload

    let imgDetail = await upload.upload(payload)

    var Data = {
        directoryName: directoryName,
        aboutDirectory: aboutDirectory,
        phoneNO: phoneNO,
        address: address,
        website: website,
        startTime: startTime,
        endTime: endTime,
        facebookLInk: facebookLInk,
        instagramLInk: instagramLInk,
        twitterLink: twitterLink,
        image: imgDetail
    }
    let result = await DAO.saveData(Models.Directory, Data)
    return result
}

const getDirectory = async (payload, userdetails) => {
    console.log("121212121121", userdetails);
    const query = {
        // isDeleted: false
    }
    let final = await DAO.getData(Models.Directory, query);
    console.log(final)
    return final

}



const singleDirectory = async (payload, userdetails) => {
    let id = payload.id
    const query = {
        _id: id,
        isDeleted: false
    }
    console.log(query)
    let result = await DAO.getDataOne(Models.Directory, query, {}, {});
    return result
}

const deleteDirectory = async (payload, userdetails) => {
    let id = payload.id
    const query = {
        _id: id,
    }
    let result = await DAO.findAndUpdate(Models.Directory, query, { isDeleted: true }, { new: true })
    return result
}

module.exports = {
    directory,
    getDirectory,
    // singleDirectory,
    deleteDirectory
}
