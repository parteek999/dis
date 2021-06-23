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
        directoryType: directoryType,
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
         isDeleted: false
    }
    var options = {
        sort: { directoryName: -1 },
    }
    let final = await DAO.getData(Models.Directory, query, {}, options);
    console.log(final)
    return final

}

const getUserDirectory = async (payload, userDetails) => {
    const { directoryType } = payload;

    const query = {
        directoryType: directoryType,
        isDeleted:false
    };
    var options = {
        sort: { createdAt: -1 },
    }
    var directory = await DAO.getData(Models.Directory, query, {}, options)
    console.log(directory)
    return directory
}

const editDirectory = async (payload, userDetails) => {
    let query={
        _id:payload.id
    }
    console.log("")
    console.log("query",query)
    let data = {}

    if (payload.directoryType!== null && payload.directoryType !== "") { data.title = payload.directoryType }
    if (payload.directoryName!== null && payload.directoryName !== "") { data.directoryName = payload.directoryName }
    if (payload.aboutDirectory!== null && payload.aboutDirectory !== "") { data.aboutDirectory = payload.aboutDirectory }
    if (payload.phoneNO!== null && payload.phoneNO !== "") { data.phoneNO = payload.phoneNO }
    if (payload.address!== null && payload.address !== "") { data.address = payload.address }
    if (payload.website!== null && payload.website !== "") { data.website = payload.website }
    if (payload.startTime!== null && payload.startTime !== "") { data.startTime = payload.startTime }
    if (payload.endTime!== null && payload.endTime !== "") { data.endTime = payload.endTime }
    if (payload.facebookLInk!== null && payload.facebookLInk !== "") { data.facebookLInk = payload.facebookLInk }
    if (payload.instagramLInk!== null && payload.instagramLInk !== "") { data.instagramLInk = payload.instagramLInk }
    if (payload.twitterLink!== null && payload.twitterLink !== "") { data.twitterLink = payload.twitterLink }
    if (payload['file']) {
        let imgDetail = await upload.upload(payload);
        data.image = imgDetail
    }

    console.log(data)
    let result = await DAO.findAndUpdate(Models.Directory, query, data, { new: true })
    return result
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
    let result = await DAO.findAndUpdate(Models.Directory, query, { isDeleted: true }, { new: true });
    return result
}

module.exports = {
    directory,
    getDirectory,
    singleDirectory,
    getUserDirectory,
    deleteDirectory,
    editDirectory
}
