 const mongoose = require('mongoose'),
     Schema = mongoose.Schema,
     Config = require('../Config');
 
 const Admins = new Schema({
     name: {type: String, default:""},
     email: {type: String, unique: true, index: true},
     password: {type: String, required:true},
     passwordResetToken: {type: String, unique: true, sparse:true},
    
 }, {
     timestamps: {
         createdAt: 'createdAt',
         updatedAt: 'updatedAt'
     }
 });
 
 module.exports = mongoose.model('Admins', Admins);