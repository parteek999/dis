const { boolean } = require('@hapi/joi');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');
// const imageSchema = new Schema({
//      _id:{type:Schema.ObjectId,ref:"Mixtures",default:null}, 
//     img:
//     {
//         data: Buffer,
//         contentType: String
//     }
// });
var Users = new Schema({
    email: {type: String, index:true, trim: true, required: true},
    password: {type: String, required: true},
    fullname : {type: String, trim: true, required: true},
    gender:{type:String,
        enum: [
            Config.APP_CONSTANTS.DATABASE_CONSTANT.GENDER.MALE,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.GENDER.FEMALE,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.GENDER.OTHER,
        ],
        required: true
    },
    dob: {type: String, required: true},
    phoneNo: {type: String, required: true},
    password: {type: String, required: true},
    verifypassword: {type: String, required: true},
    // imageSchema:[imageSchema],
    // profilePicURL: {type: String, default: null},
    img: {data: Buffer, contentType: String},
    verification:{type:String,enum:[
        Config.APP_CONSTANTS.DATABASE_CONSTANT.VERIFICATION_TYPE.AADHAR_CARD,
        Config.APP_CONSTANTS.DATABASE_CONSTANT.VERIFICATION_TYPE. DRIVING_LISCENCE,
        Config.APP_CONSTANTS.DATABASE_CONSTANT.VERIFICATION_TYPE.PANCARD,
    ]},
    otp: {
        type: String,
        required: true,
  
      },
    goingToParty:{type: Boolean},
    

})
module.exports = mongoose.model('Users', Users);