

const DAO = require('../DAOManager').queries,
    Config = require('../Config'),
    ERROR = Config.responseMessages.ERROR,
    {sendPushNotification} = require('../Libs/notification'),
    Models = require('../Models');
    var av = require('average-rating');
    var average = av.average;

    const geolib = require('geolib');


 const PlaceOrder = async (payload, userDetails) => {

  const {tableNo, branchId,lat, long } = payload;

  // console.log("==========payload========",payload)

  if(!(lat !=undefined && long !=undefined)){
    throw ERROR.UPDATE_APP;
  }
  const { location } = await DAO.getDataOne(Models.Branchs,{_id:branchId},{location:1});

  const inside = geolib.isPointWithinRadius(
                {latitude: lat, longitude:long},
                {latitude: location[1], longitude:location[0]},
                200
            );

  if(!inside){
    throw ERROR.ORDER_INSIDE_BAR;
  }          
                    
  if(userDetails.scope === Config.APP_CONSTANTS.SCOPE.USER){
    payload.userId = userDetails._id;
    // if(payload.cashbackUsed && userDetails.cashback < payload.cashbackUsed *.4 ) {

    // }
  }
  else{
    payload.captainId = userDetails._id
    payload.status = Config.APP_CONSTANTS.DATABASE_CONSTANT.ORDER_STATUS.CONFIRMED;
  }

  const promise = [
    DAO.saveData(Models.Order,payload)
  ];

  if( payload.cashbackUsed ){
    promise.push(
      DAO.findAndUpdate(Models.Users,{_id: userDetails._id},{ $inc: { cashback: payload.cashbackUsed * -1 }})
    )
  }
  await Promise.all(promise);
  return null;



 }


 const GetOrder = async ( payload, userDetails) => {
   
  const query = {};

  const populateData = [{
    path: 'stock._id',
    select: 'name _id',
    options: {},
    model:Models.Stocks
},
{
  path: 'stock.categoryId',
  select: 'name _id',
  options: {},
  model:Models.Categories
},
{
  path: 'mixture._id',
  select: 'name _id',
  options: {},
  model:Models.Mixtures
}]

  if(userDetails.scope === Config.APP_CONSTANTS.SCOPE.USER){
    query.userId = userDetails._id
  }
  else{

    let table = [];

    populateData.push({
      path: 'userId',
      select: 'firstName lastName _id',
      options: {},
      model:Models.Users
    })


    if(payload.status && payload.status !== 'All'){
      query.status = Config.APP_CONSTANTS.DATABASE_CONSTANT.ORDER_STATUS.PENDING;
      table = await DAO.getUniqueData(Models.Table,{captain: userDetails._id, isBlocked: false},{},{},'name');
      query.tableNo = {$in:table};
    }
    else{
    query.status = {$ne:Config.APP_CONSTANTS.DATABASE_CONSTANT.ORDER_STATUS.PENDING};
    query.captainId = userDetails._id;
    query.createdAt = {$gt:new Date().getTime() - 12 * 3600000}
    }
  }

 
  return DAO.populateData(Models.Order,query,{},{sort:{createdAt:-1}},populateData);
 }


 const OrderAction = async ( payload, userDetails) => {

  const populateData = [{
    path: 'stock._id',
    select: 'name _id KIItemCode',
    options: {},
    model:Models.Stocks
},
{
  path: 'stock.categoryId',
  select: 'name _id',
  options: {},
  model:Models.Categories
},
{
  path: 'branchId',
  select: 'OutletCode Outletpswd',
  options: {},
  model:Models.Branchs
},
{
  path: 'mixture._id',
  select: 'name _id KIItemCode',
  options: {},
  model:Models.Mixtures
},
{
  path: 'captainId',
  select: 'name _id',
  options: {},
  model:Models.Captain
},
{
  path: 'userId',
  select: 'firstName _id',
  options: {},
  model:Models.Users
},
]
  const data = await DAO.populateData(Models.Order,{_id: payload._id},
    {
      createdAt:1,
      totalAmount:1,
      tableNo:1,
      captainId:1,userId:1, status:1, stock:1,mixture:1, discount: 1, cashbackUsed:1,branchId:1},{},
    populateData);

  if(data.length === 0 ) throw ERROR.ORDER_NOT_FOUND;

  if( data.length && data[0].status !== Config.APP_CONSTANTS.DATABASE_CONSTANT.ORDER_STATUS.PENDING ){
    const error = ERROR.ORDER_ALREADY_UPDATED;
    error.customMessage.en = `This Order is already ${data[0].status}.`
    throw error;
  }

  const promise = [
    DAO.findAndUpdate(Models.Order,{_id: payload._id},{status: payload.status,captainId:userDetails._id})
  ];


  const [,userData] = await Promise.all(promise);
  
  // console.log("====================userData.deviceToken", userData)
  if(userData && userData.deviceToken){
    let notiMessage = `Your order has been ${payload.status}`;
    if(payload.status === Config.APP_CONSTANTS.DATABASE_CONSTANT.ORDER_STATUS.REJECT){
      notiMessage = `Sorry! Your order has been rejected`;
    }
    const message = {
      message: notiMessage,
      type: 1,
      orderId:payload._id
    }
     sendPushNotification(message,[userData.deviceToken])
  }
  
 }



const PlaceOrderCheck = async ({}, userDetails) => {

  return {
    cashback: userDetails.cashback ? userDetails.cashback : 0,
    maxRedumption: 50,
    discountType: "percentage"
  }
}


const userrating = async (payload,qwert) => {
  
console.log(payload._id);
 await DAO.findAndUpdate(Models.Order, { _id: payload._id },payload,{new:true})
 }


 const getrating = async (payload) => {


  return await DAO.aggregateData(Models.Order,[
    // {
    //   $group:
    //     {
    //       _id: "rating",
    //       srevice: { $avg:  "$rating.srevice"  },
    //       quality: { $avg: "$rating.quality" }
    //     }
    // }
     {
        $group:
         {
            _id: "rating",
            totalrating: { $avg: {$sum:[ "$rating.srevice","$rating.quality"]} }
            }}
    
  ],{})

//   console.log()
//   var a=[];
//   for(var i=0;i<result.length;i++)
//   {
//    a.push(result[i].rating.srevice)
//     }
//     console.log(a);
//   return average(a)
//   // console.log(result)
//  console.log(rate);
 
   
}
module.exports = {
    PlaceOrder,
    GetOrder,
    OrderAction,
    //BotContent,
    PlaceOrderCheck,
    userrating,
    getrating
};