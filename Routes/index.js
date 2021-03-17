const user = require('./user');
const Admin=require('./Admin');
const news=require('./news')

const all = [].concat(
     user,Admin,news
);
module.exports = all;

