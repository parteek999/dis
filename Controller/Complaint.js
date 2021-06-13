const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    Models = require('../Models');
var upload = require('../Libs/uploadManager');



const complaint = async (payload) => {
    const { email, name, password, countryCode, phoneNo,work,
        telephoneNo, occupation, age, recipientName,
        recipientAddress, recipientTelephone,
        description1,
        description2,
        description3,
        description4,
        description5,
        // description6
    } = payload
    var number = await (countryCode + phoneNo)
    var Data = {
        email: email,
        name: name,
        countryCode: countryCode,
        phoneNo: phoneNo,
        fullNo: number,
        work:work,
        telephoneNo: telephoneNo,
        occupation: occupation,
        age: age,
        recipientName: recipientName,
        recipientAddress: recipientAddress,
        recipientTelephone: recipientTelephone,
        description1: description1,
        description2:description2,
        description3:description3,
        description4:description4,
        description5:description5,
        // description6:description6,
    }
    const final = await DAO.saveData(Models.Complaint, Data);
    console.log(final)
    return { final }
}

const getComplaint = async (payload) => {
    return DAO.getData(Models.Complaint, {}, {});
}

const singleComlaint = async (payload) => {
    const query = {
        _id: payload.id
    }
    let final = await DAO.getDataOne(Models.Complaint, query, {}, {})
    return final
}

const editStatus = async (payload, userdetails) => {
    let { id, status } = payload
    
    const query = {
        _id: id,
    };
    change = {
        status:status
    }
    console.log(change,query)
    let result = await DAO.findAndUpdate(Models.Complaint, query,change, { new: true })
    return result
}



module.exports = {
    singleComlaint,
    getComplaint,
    complaint,
    editStatus
}
