const { number } = require('@hapi/joi');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');
const request = new Schema({
     
   _id:{type:Schema.ObjectId,ref:"user",default:null},
   accepted:[{type: String}],
   rejected:[{type: String}],
   pending:[{type: String}]
});

var party=new.Schema({
    userType:{type: String,enum:[
        Config.APP_CONSTANTS.DATABASE_CONSTANT.USERTYPE.GUEST,
        Config.APP_CONSTANTS.DATABASE_CONSTANT.USERTYPE.HOST
    ]},
    partyName:{type: String, trim: true,unique: true, trim: true,required: true},
    partyPrice:{type:Number},
    venue:{ type: [Number], index: { type: '2dsphere', sparse: true }},
    startTime:{ type : Date, default: Date.now },
    endingTime:{ type : Date, default: Date.now },
    descriptopn:{type: String, trim: true,required: true},
    loc: { type: [Number], index: { type: '2dsphere', sparse: true }},
    category:{type: String,enum:[
        Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.POOL,
        Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.KARAOKE,
        Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.BIRTHDAY,
        Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.MUSIC,
        Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.DRINKING,
    ]},
        date:{ type: Date, required: true, default: Date.now },
        gathering:{type:Number},
        eventhostType:{type :String,enum:[
            Config.APP_CONSTANTS.DATABASE_CONSTANT. EVENTHOSTTYPE.INDIVIDUAl,
            Config.APP_CONSTANTS.DATABASE_CONSTANT. EVENTHOSTTYPE. ORGANISATION,

        ]},
      hostid:{type:Schema.ObjectId,ref:"user",default:null},
      userid:{type:Schema.ObjectId,ref:"user",default:null},
      request:[request],
    
       
         




})
    
module.exports = mongoose.model('party', party);