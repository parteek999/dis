const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    Models = require('../Models');
    var upload = require('../Libs/uploadManager');
   
const addContact = async (payload, userDetails) => {
    const { title, number,contactType } = payload
    let imgDetail = await upload.upload(payload)
    var Data = {
        title: title,
        number: number,
        image: imgDetail,
        contactType:contactType
    }
    let result = await DAO.saveData(Models.Contact, Data)
    return result
}

const getContact = async (payload, userdetails) => {
    const query = {
        isDeleted: false
    }
    return DAO.getData(Models.Contact, query);
}

const deleteContact = async (payload,userdetails)=>{
    let id = payload.id
    const query = {
        _id:id,
    }
    let result=await DAO.findAndUpdate(Models.Contact, query,{ isDeleted:true},{new:true})
    return result 
}




// const singleContact = async (payload, userdetails) => {
//     let  id = payload.id
//     const query = {
//         _id:id,
//         isDeleted: false
//     }
//     let result=await DAO.getDataOne(Models.news, query,{},{});
//     return result
// }



module.exports = {
    addContact, 
    getContact,
    // singleContact,
     deleteContact
}