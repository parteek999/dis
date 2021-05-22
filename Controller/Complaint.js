const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    Models = require('../Models');
var upload = require('../Libs/uploadManager');



const complaint = async (payload) => {
    const { email, name, password, countryCode, phoneNo,
        telephoneNo, occupation, age, recipientName,
        recipientAddress, recipientTelephone, description
    } = payload
    var number = await (countryCode + phoneNo)
    var Data = {
        email: email,
        name: name,
        countryCode: countryCode,
        phoneNo: phoneNo,
        fullNo: number,
        telephoneNo: telephoneNo,
        occupation: occupation,
        age: age,
        recipientName: recipientName,
        recipientAddress: recipientAddress,
        recipientTelephone: recipientTelephone,
        description: description
    }
    const final = await DAO.saveData(Models.Complaint, Data);
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
