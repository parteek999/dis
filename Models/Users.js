var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');

var Users = new Schema({
    countrycode:{type:String},
    email: {type: String, trim: true},
    password: {type: String},
    fullName : {type: String, trim: true },
    gender:{type:String,
        enum: [
            Config.APP_CONSTANTS.DATABASE_CONSTANT.GENDER.MALE,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.GENDER.FEMALE,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.GENDER.OTHER,
        ],
    },
    dob: {type: String},
    phoneNo: {type: String},
    isVerified:{type:Boolean,default:false},
    isblocked:{type:Boolean,default:false},
    imgUrl:[ {type: String, default: null}],
    
    verification:{type:String},
    otp: {type: Number,default:null},
    // accessToken:{type:String}
    
})
module.exports = mongoose.model('Users', Users);