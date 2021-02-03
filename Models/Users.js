var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');

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
   
    imgUrl:[ {type: String, default: null}],
    
    verification:{type:String},
    otp: {
        type: String,
        required: true,
    },
   
    
})
module.exports = mongoose.model('Users', Users);