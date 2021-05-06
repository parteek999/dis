const user = require('./user');
const Admin=require('./Admin');
const news=require('./news');
const registration=require('./registration');
const directory =require('./directory');
const rights=require('./rights');

const all = [].concat(
     user,Admin,news,registration,directory,rights
);
module.exports = all;

