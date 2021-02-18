const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

var    admin = new Schema({
    name: {type: String, default: null},
    email: {type: String, unique: true, index: true},
    password: {type: String, required:true},
    passwordResetToken: {type: String, unique: true, sparse:true},
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('admin', admin);