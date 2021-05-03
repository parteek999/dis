var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');



const SectionA = new Schema({

    categoryId: { type: Schema.ObjectId, ref: "Categories", default: null },
    
    _id: { type: Schema.ObjectId },
    
    type: {
        type: String, enum: [
            Config.APP_CONSTANTS.DATABASE_CONSTANT.ITEM_TYPE.FOOD,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.ITEM_TYPE.WINE
        ],
        default: Config.APP_CONSTANTS.DATABASE_CONSTANT.ITEM_TYPE.WINE
    },
    
    quantity: { type: Number },
    
    price: { type: Number },

});


var registration = new Schema({

    stock: [stock],

    isBlocked: { type: Boolean, default: false },

    isVerified: { type: Boolean, default: false },

    countryCode: { type: String },

    email: { type: String, trim: true },

    password: { type: String },

    phoneNo: { type: String },

    fullNo: { type: String, default: "" },

    name: { type: String, trim: true },

    profilePic: { type: String, default: "" },

    deviceToken: { type: String, default: "", trim: true },

    article_Id: [{ type: String, default: "" }],

    loginType: {
        type: String, enum: [
            Config.APP_CONSTANTS.DATABASE_CONSTANT.ACCOUNT_TYPE.GMAIL
        ], index: true
    },

    deviceType: {
        type: String, default: "", enum: [
            Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.IOS,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.ANDROID
        ]
    },
},
    { timestamps: true, }

);

module.exports = mongoose.model('registration', registration);

