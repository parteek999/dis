var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');

var Complaint = new Schema({
   
    countryCode: { type: String },
    email: { type: String, trim: true },
    phoneNo: { type: String },
    telephoneNo:{ type: String },
    fullNo:{type:String,default:""},
    name: { type: String, trim: true },
    address:{type:String ,default:""},
    occupation:{type: String, trim: true},
    age: {type:Number},
    
    recipientName:{type: String, trim: true},
    recipientAddress:{type: String, default:""},
    recipientTelephone:{type:Number,default:""},
    description1:{type:String,default:""},
    description2:{type:String,default:""},
    description3:{type:String,default:""},
    description4:{type:String,default:""},
    description5:{type:String,default:""},
    description6:{type:String,default:""},
    status:{type:String,default:"pending"},
    
    
//     loginType:{
//         type: String, enum: [
//             Config.APP_CONSTANTS.DATABASE_CONSTANT.ACCOUNT_TYPE.GMAIL
//         ],index: true
//     },
//     deviceType: {
//         type: String,enum: [
//             Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.IOS,
//             Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.ANDROID
//         ]
//     },
 },
 {timestamps: true,}

);

module.exports = mongoose.model('Complaint', Complaint);