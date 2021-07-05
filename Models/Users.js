var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');

var Users = new Schema({
    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    countryCode: { type: String,default:"" },
    email: { type: String, trim: true ,},
    password: { type: String },
    phoneNo: { type: String,default:"" },
    fullNo:{type:String,default:""},
    // accessToken:{type:String,default:""},
    socialId:{type: String,trim: true,default:""},
    socialLoggedIn:{type:String,default:false},
    name: { type: String, trim: true ,default:""},
    profilePic: { type: String, default: "" },
    deviceToken: { type: String, default: "", trim: true },
    article_Id:[{type: String, default: ""}],
    notificationToggle:{type:Boolean,default:true},
    loginType:{
        type: String, enum: [
            Config.APP_CONSTANTS.DATABASE_CONSTANT.ACCOUNT_TYPE.GMAIL
        ]
    },
    deviceType: {
        type: String, default: "", enum: [
            Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.IOS,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.ANDROID
        ]
    },
}, {timestamps: true,}

);

module.exports = mongoose.model('Users', Users);








