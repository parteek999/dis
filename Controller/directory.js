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
        directoryName:directoryName,
        aboutDirectory:aboutDirectory,
        phoneNO:phoneNO,
        address:address,
        website:website,
        startTime:startTime,
        endTime:endTime,
        facebookLInk:facebookLInk,
        instagramLInk:instagramLInk,
        twitterLink:twitterLink,
        image: imgDetail
    }


    let result = await DAO.saveData(Models.Directory, Data)
    return result

}

module.exports = {
    directory
}
