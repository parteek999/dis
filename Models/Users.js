var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');

var Users = new Schema({
    email: {type: String, index:true, trim: true},
    password: {type: String},
    fullName : {type: String, trim: true },
    gender:{type:String,
        enum: [
            Config.APP_CONSTANTS.DATABASE_CONSTANT.GENDER.MALE,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.GENDER.FEMALE,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.GENDER.OTHER,
        ],
        required: true
    },
    dob: {type: String},
    phoneNo: {type: String},
   
    imgUrl:[ {type: String, default: null}],
    
    verification:{type:String},
    otp: {
        type: String,
      
    },
    
    
})
module.exports = mongoose.model('Users', Users);