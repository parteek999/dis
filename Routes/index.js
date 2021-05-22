const user = require('./user');
const Admin=require('./Admin');
const news=require('./news');
const registration=require('./registration');
const directory =require('./directory');
const rights=require('./rights');
const complaint =require('./complaints');
const contact=require('./contact')

const all = [].concat(
     user,Admin,news,registration,directory,rights,complaint,contact
);
module.exports = all;

