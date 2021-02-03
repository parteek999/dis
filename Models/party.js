var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');


var party = new Schema({
   
    name: { type: String, trim: true, unique: true, trim: true, required: true },
    price: { type: Number },
    addressvenue: { type:String },
    startTime: { type: Date, default: Date.now },
    endingTime: { type: Date, default: Date.now },
    descriptopn: { type: String, trim: true, required: true },
    loc: { type: [Number], index: { type: '2dsphere', sparse: true } },
    category: {
        type: String, enum: [
            Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.POOL,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.KARAOKE,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.BIRTHDAY,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.MUSIC,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.DRINKING,
        ]
    },
    date: { type: Date, required: true, default: Date.now },
    gathering: { type: Number },
    eventhostType: {
        type: String, enum: [
            Config.APP_CONSTANTS.DATABASE_CONSTANT.EVENTHOSTTYPE.INDIVIDUAl,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.EVENTHOSTTYPE.ORGANISATION,
        ]
    },
    request: {
        accepted: [{ type:Schema.ObjectId,ref:"Users",default:null }],
        rejected: [{type:Schema.ObjectId,ref:"Users",default:null}],
        pending: [{type:Schema.ObjectId,ref:"Users",default:null}]
    },

    rating: [{
        userid:{type:Schema.ObjectId,ref:"Users",default:null},
        descriptopn: { type: String, trim: true, required: true },
        rating: { type: Number, require: true },
    }],
    reportEvent:[{
        descriptopn: { type: String, trim: true, required: true },
        userid:{type:Schema.ObjectId,ref:"Users",default:null}
    }],

})

module.exports = mongoose.model('party', party);