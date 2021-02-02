var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');


var party=new.Schema({
    userType:{type: String,enum:[
        Config.APP_CONSTANTS.DATABASE_CONSTANT.USERTYPE.GUEST,
        Config.APP_CONSTANTS.DATABASE_CONSTANT.USERTYPE.HOST
    ]},
    partyName:{type: String, trim: true,unique: true, trim: true,required: true},
    partyPrice:{type:Number},
    // loc :  { type: {type:String}, coordinates: [Number]},
    startTime:{ type : Date, default: Date.now },
    endingTime:{ type : Date, default: Date.now },
    descriptopn:{type: String, trim: true,required: true},
    loc: { type: [Number], index: { type: '2dsphere', sparse: true }},
})
    
module.exports = mongoose.model('party', party);