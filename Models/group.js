var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');

var group = new Schema({
    groupname:{type:String},
    groupparticipants:{type:String}
    
})

module.exports = mongoose.model('group', group);