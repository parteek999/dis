var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');


var filter=new.Schema({
    category:{type: String,enum:[
        Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.POOL,
        Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.KARAOKE,
        Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.BIRTHDAY,
        Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.MUSIC,
        Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.DRINKING,
    ]},
   
     
})
module.exports = mongoose.model('filter', filter);