let mongoose = require('mongoose'),
    Config = require('../Config'),
    DAO = require('../DAOManager').queries,
    Models = require('../Models'),
    bcrypt = require('bcryptjs'),
    winston = require('winston');


mongoose.Promise = Promise;
const util = require('util');
const fs = require('fs');


//Connect to MongoDBnpm
mongoose.connect(Config["development"].mongoDb.URI, { useUnifiedTopology: true,useCreateIndex: true,useNewUrlParser: true, useFindAndModify: false }).then(success => {
     console.log('MongoDB Connected')
     Run();
}).catch(err => {
    console.log( err)
    winston.info({ ERROR: err });
    process.exit(1);
});

const Run = async () => {
    let password = "$2y$11$o/AKImaWzNxazNm/9TCdieDU7c.BzfoGt3IM9u5mcat/OaMEStsdm";
    
    let adminDetails1 = {
        name : "NCPD ADMIN",
        email: "developer@csbtechemporium.com",
        password: password,           //q%E7<HIKL,*B~9b|
    };
    
    let adminDetails2 = {
        name : "NCPD ADMIN",
        email: "Admin@AccessAbilityBahamas.org",
        password: password,           //q%E7<HIKL,*B~9b|
    };
    CreateAdmin(adminDetails2);
    CreateAdmin(adminDetails1);
}


const CreateAdmin = async (adminDetails) => {
    return new Promise((resolve, reject) => {
        try {
            let adminData = DAO.findAndUpdate(Models.Admin, { email: adminDetails.email }, adminDetails, { lean: true, upsert: true, new: true });
            return resolve("Admin Added");
        } catch (err) {
            console.log("====================", err)
            return reject(err);
        }
    });
}


module.exports = {
    Run: Run
}