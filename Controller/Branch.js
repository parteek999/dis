/**
 * Created by Shumi on 17/3/20.
 */

const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    UniversalFunctions = require('../Utils/UniversalFunctions'),
    TokenManager = require('../Libs/TokenManager'),
    Bcrypt = require('bcryptjs'),
    {getDistance} = require('geolib'),
    Common = require('./Common')

    const request = require("request");
    const fs = require('fs');
    const json2xls = require('json2xls');
    const Path = require('path');
    const mongoose = require('mongoose');
const Models = require('../Models');

    const ObjectId = mongoose.Types.ObjectId;

const  Login= async (payload)=> {

   try {
       const { email, password } = payload;

       const query = {
           email,
           isBlocked: false
       };

      const result = await DAO.getDataOne(Models.Branchs,query);
      if(result === null ) throw ERROR.INVALID_CREDENTIALS;
      const checkPassword = Bcrypt.compareSync(password, result.password); //compare password string to encrypted string

      if(!checkPassword) throw ERROR.INVALID_CREDENTIALS;

      let tokenData={
        scope:Config.APP_CONSTANTS.SCOPE.BRANCH,
        _id:result._id,
        time:new Date(),
        // exp:Math.floor(Date.now() / 1000) + 1800
    };

   
      const accessToken = await TokenManager.GenerateToken(tokenData,Config.APP_CONSTANTS.SCOPE.BRANCH);
            
            return {
                accessToken,
                name:result.name
            }

   }
    catch (err){
        throw err
    }
}


const  UpdateBranch= async (payload, userDetails)=> {

    try {
       
        let query = {
            // isBlocked: false,
            _id : userDetails._id
        };



       const result = await DAO.getData(Models.Branchs,query,{_id:1},{limit:1});

       if(!result.length){
           throw ERROR.UNAUTHORIZED;
       }

        await DAO.findAndUpdate(Models.Branchs,{_id:userDetails._id}, payload);


       return null;

    }
     catch (err){
         throw err
     }
 }

 const GetBranch = async (payload, userDetails) => {

    let query = {
        isBlocked: false
    }
    if(userDetails.scope === Config.APP_CONSTANTS.SCOPE.BRANCH){
        query._id = userDetails._id
    }
    const populateData = [{
        path: 'city',
        select: 'name _id',
        options: {},
        model:Models.Citys
    }]
    const data =  await DAO.populateData(Models.Branchs,query,{password:0, isBlocked: 0},{},populateData);

    return data.map( (i) => {
        return {
            ...i._doc,
            city: i._doc.city.name,
            cityId: i._doc.city._id,

            distance:getDistance(
                {latitude:payload.lat,longitude: payload.long},
                {latitude:i.location[1],longitude:i.location[0]}
                )
        }
    })
 }


module.exports = {
    Login,
    UpdateBranch,
    GetBranch,
    
};