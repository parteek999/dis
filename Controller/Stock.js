/**
 * Created by Shumi on 17/3/20.
 */

const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    UniversalFunctions = require('../Utils/UniversalFunctions'),
    TokenManager = require('../Libs/TokenManager')
    Models = require('../Models'),
    Bcrypt = require('bcryptjs'),
    request = require("request");
   
   
    const mongoose = require('mongoose');

    const ObjectId = mongoose.Types.ObjectId;

 const GetMixture = (payload, userDetails) => {

    let query = {isDeleted: false,branchId:payload.branchId}
    if(userDetails.scope === Config.APP_CONSTANTS.SCOPE.BRANCH){
        payload.branchId = userDetails._id
        query.branchId = payload.branchId
    }
    else{
        query.isBlocked = {$ne:true};
    }

    if(!payload.branchId) throw ERROR.INCORRECT_DETAILS;

    return DAO.getData(Models.Mixtures,query,{});
 }

 const CreateMixture = async (payload, userDetails) => {

    const query = {
        name: payload.name,
        isDeleted: false,
        branchId: userDetails._id
    }

    if(payload._id){
        query._id = {$ne:payload._id}
    }

    const result = await DAO.getData(Models.Mixtures,query);

    if(result.length){
        throw ERROR.DUPLICATE;
    }

    payload.branchId = userDetails._id;

    if(payload._id){
        let query ={name: payload.name};
        if(payload.isBlocked !==undefined){
            query.isBlocked =payload.isBlocked;
        }
        if(payload.isDeleted !==undefined){
            query.isDeleted =payload.isDeleted;
        }
        await DAO.updateOne(Models.Mixtures,{_id: payload._id},query)

    }
    else{
        const {_doc: savedData} =  await DAO.saveData(Models.Mixtures,payload);
        return savedData;
    }

    return null;

 }


 
 const CreateStock = async (payload, userDetails) => {

    const query = {
        name: payload.name,
        isBlocked: false,
        branchId: userDetails._id
    }

    if(payload.categoryId) {
        query.categoryId = payload.categoryId
    }

    if(payload._id){
        query._id = {$ne:payload._id}
    }

    const result = await DAO.getData(Models.Stocks,query);

    if(result.length){
        throw ERROR.DUPLICATE;
    }

    payload.branchId = userDetails._id;

    if(payload._id){
       return await DAO.findAndUpdate(Models.Stocks,{_id: payload._id},payload,{new: true})

    }
    else{
       
        const {_doc: savedData} = await DAO.saveData(Models.Stocks,payload);
        return savedData;

    }

 }

 
 const GetStock = (payload, userDetails) => {

    const branchCall = userDetails.scope === Config.APP_CONSTANTS.SCOPE.BRANCH;

    if(branchCall){
        payload.branchId = userDetails._id
    }

    if(branchCall && payload.type != 'grouped'){
        const query = {isDeleted:false,branchId:(payload.branchId)};

        if(payload.stockType){

            query.itemType = payload.stockType
        }

    const populateData = [{
        path: 'categoryId',
        select: 'name _id image',
        options: {},
        model:Models.Categories
    },]

    return DAO.populateData(Models.Stocks,query,{},{},populateData);
    }
    else{
        if(!payload.branchId) throw ERROR.INCORRECT_DETAILS;

    const populateData = [{
        path: '_id',
        select: 'name _id image priority',
        options: {},
        model:Models.Categories
    }]

    const critria = {
        isDeleted:false,isBlocked: false,branchId:ObjectId(payload.branchId)
    }

    if(payload.stockType){

        critria.itemType = payload.stockType
    }

    const query = [
        {
            $match:critria
        },
        { 
            "$addFields" : { 
                "currentPrice" : { 
                    "$cond" : { 
                        "if" : { 
                            "$gte" : [
                                "$crashMarketEndTime", 
                                new Date()
                            ]
                        }, 
                        "then" : {
                            "$multiply" : [
                            "$currentPrice", 
                            "$crashMarketPercentage"
                        ]}, 
                        "else" : "$currentPrice"
                        
                    }
                }
            }
        },
        {
            $sort:{
                priority:1
            }
        },
        {
            $group:{ _id : "$categoryId", subCategory: { $push: "$$ROOT" } }
        },
    ]

    return DAO.aggregateDataWithPopulate(Models.Stocks,query,populateData);
    }

    
 }

 const DeleteStocks = async (payload) => {

    const dataToSet = {}
     if(payload.isBlocked !== undefined){
        dataToSet.isBlocked = payload.isBlocked
     }
     if(payload.isDeleted !== undefined){
        dataToSet.isDeleted = payload.isDeleted

    }
    await DAO.findAndUpdate(Models.Stocks,{_id: payload._id}, dataToSet)
}

const GetTable = async (payload) => {
    let tableNo = await DAO.getUniqueData(Models.Table,{isBlocked:false,branchId: payload.branchId},{},{},'name')

    if(tableNo.length){
        for(let i = 0; i < tableNo.length; i++ ){

            if(Number(tableNo[i])){
                tableNo[i] = Number(tableNo[i])
            }
        }
        // tableNo = tableNo.sort();
        // console.log("=========Number(tableNo[i])==============",tableNo)

        tableNo.sort(function(a, b) {
            return a - b;
          });
        // console.log("=========Number(tableNo[i])==============",tableNo)

    }
    return {
        tableNo
    };
    
}

const CrashMarket = async (payload) => {
    
    payload.time = new Date+(new Date().getTime() + payload.time * 60 * 1000);
    payload.percentage = (100 - payload.percentage)/100;
    await DAO.updateMany(Models.Stocks,
        {_id:{$in:payload._id}},
        {crashMarketPercentage: payload.percentage,crashMarketEndTime:payload.time});

    return null;
}


const GetStockByCategory = (payload, userDetails) => {
    
    const { categoryId, type } = payload;

    const query = {
        categoryId,
        branchId: userDetails._id
    };

    if(type) {
        query.type= type;
    }
    return DAO.getData(Models.Stocks,query, {name:1,_id:1})
 }


 const GetStockWebScreen = (payload, userDetails) => {

    const populateData = [{
        path: '_id',
        select: 'name _id image priority',
        options: {},
        model:Models.Categories
    }]

    const critria = {
        isDeleted:false,isBlocked: false,branchId:ObjectId(payload.branchId)
    }

    // if(payload.stockType){

        critria.itemType = Config.APP_CONSTANTS.DATABASE_CONSTANT.ITEM_TYPE.WINE
    // }

    const query = [
        {
            $match:critria
        },
        { 
            "$addFields" : { 
                "currentPrice" : { 
                    "$cond" : { 
                        "if" : { 
                            "$gte" : [
                                "$crashMarketEndTime", 
                                new Date()
                            ]
                        }, 
                        "then" : {
                            "$multiply" : [
                            "$currentPrice", 
                            "$crashMarketPercentage"
                        ]}, 
                        "else" : "$currentPrice"
                        
                    }
                }
            }
        },
        {
            $sort:{
                priority:1
            }
        },
        {
            $group:{ _id : "$categoryId", subCategory: { $push: "$$ROOT" } }
        },
    ]

    return DAO.aggregateDataWithPopulate(Models.Stocks,query,populateData);
    

    
 }
module.exports = {
    GetMixture,
    CreateMixture,
    CreateStock,
    GetStock,
    DeleteStocks,
    GetTable,
    CrashMarket,
    GetStockByCategory,
    GetStockWebScreen
};