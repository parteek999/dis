const DAO = require('../DAOManager').queries
const Models = require('../Models');

const ratings = async (payload) => {
    result = await DAO.saveData(Models.crud, payload);
    return {
        user: {
            ...payload
        }
    }
}
const Getratings = (payload) => {
    const query = {
        name: payload.name,
    }
    console.log(query)
    return DAO.getData(Models.crud,query,{})
   
 }


 const Updaterating = async (payload, userDetails) => {

    let query = {
        name: payload.name,
        rating: payload.newrating,
    }

   
     if (!payload.name) throw ERROR.INCORRECT_DETAILS;
     const result = await DAO.getData(Models.crud,{ userName: payload.name },{});

           if(result.length===null){
               throw ERROR.BRANCH_NOT_FOUND;
           }
    

    await DAO.findAndUpdate(Models.crud, { name: payload.name },query, {})
    console.log(payload.newrating)
    
    // await DAO.saveData(Models.crud, payload)
    return DAO.getData(Models.crud,{name: payload.name} , {});

}
module.exports = {ratings,Getratings,Updaterating};