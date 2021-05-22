const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    Models = require('../Models');
    var upload = require('../Libs/uploadManager');
   
const addContact = async (payload, userDetails) => {
    console.log(payload)
    const { title, number } = payload
    let imgDetail = await upload.upload(payload)
    console.log("3434343", imgDetail)
    var Data = {
        title: title,
        number: number,
        image: imgDetail,
    }
    let result = await DAO.saveData(Models.Contact, Data)
    return result
}

const getContact = async (payload, userdetails) => {
    console.log(userdetails);
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
//     console.log(query)
//     let result=await DAO.getDataOne(Models.news, query,{},{});
//     return result
// }



module.exports = {
    addContact, 
    getContact,
    // singleContact,
     deleteContact
}