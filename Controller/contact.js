const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    Models = require('../Models');
    var upload = require('../Libs/uploadManager');
   
const addContact = async (payload, userDetails) => {
    const { title, number,contactType } = payload
    var totalContact =await DAO.count(Models.Contact)
    let imgDetail = await upload.upload(payload)
    var Data = {
        title: title,
        number: number,
        image: imgDetail,
        contactType:contactType,
        order:totalContact+1
    }
    let result = await DAO.saveData(Models.Contact, Data)
    return result
}

const getContact = async (payload, userdetails) => {
    const query = {
        isDeleted: false
    }
    const options = {
        sort: { order: 1 },
      };
    return DAO.getData(Models.Contact, query,{},options);
}

const deleteContact = async (payload,userdetails)=>{
    let id = payload.id
    const query = {
        _id:id,
    }
    let result=await DAO.findAndUpdate(Models.Contact, query,{ isDeleted:true},{new:true})
    return result 
}

const editContact = async (payload, userDetails) => {
    let query={
        _id:payload.id
    }
    let data = {}
    // console.log(payload.number)
       console.log(!payload.number)
    if (payload.title) { data.title = payload.title }
    if (payload.number) { data.number = payload.number }
    if (payload.contactType) { data.contactType = payload.contactType }
    if (payload['file']) {
        let imgDetail = await upload.upload(payload);
        data.image = imgDetail
    }
    let result = await DAO.findAndUpdate(Models.Contact, query, data, { new: true })
    return result
}

const singleContact = async (payload, userdetails) => {
    console.log("hello")
    // let  id = payload.id
    const query = {
        _id:payload.id,
        isDeleted: false
    }
    let result=await DAO.getDataOne(Models.Contact, query,{},{});
    return result
}


const contactOrder = async (payload, userdetails) => {
    console.log(payload)
    const data =JSON.parse(payload.hello)
      const promises = [];
      data.forEach((element) => {
          promises.push(
            Models.Contact.findByIdAndUpdate(
                element._id,
                {
                    $set: {
                        order:element.order
                    }
                }
            )     
          )
      });
    await Promise.all(promises);
    return 
}

module.exports = {
    addContact, 
    getContact,
    singleContact,
    deleteContact,
    editContact,
    contactOrder
}