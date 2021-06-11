const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    Models = require('../Models');
const { Model } = require('mongoose');
var upload = require('../Libs/uploadManager');

const directory = async (payload) => {

    const { 
        directoryType,
        directoryName,
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
        directoryType:directoryType,
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
    let directory = await DAO.saveData(Models.Directory, Data)
    return directory
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

const getUserDirectory=async (payload,userDetails)=>{
    const {directoryType} = payload;
    
    const query={
          directoryType:directoryType
    };
    var directory = await DAO.getDataOne(Models.Directory,query)
    return dirctory
}


const singleDirectory = async (payload, userdetails) => {
    let id = payload.id
    const query = {
        _id: id,
        isDeleted: false
    }
    console.log(query)
    let directory = await DAO.getDataOne(Models.Directory, query, {}, {});
    return directory
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
    singleDirectory,
    getUserDirectory,
    deleteDirectory
}
