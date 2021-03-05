const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Config = require('../Config');

const Admins = new Schema({
    name: {type: String, default: null},
    email: {type: String, unique: true, index: true},
    password: {type: String, required:true},
});

module.exports = mongoose.model('Admins', Admins);