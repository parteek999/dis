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
    let password = "$2a$10$cVdFaLSXyVw0//ep5XlkT.J8q4wPnRmdhuPwewO4/wG4TAdvtfR3C";
    
    let adminDetails1 = {
        name : "NCPD ADMIN",
        email: "developer@csbtechemporium.com",
        $setOnInsert:{password: password},           //q%E7<HIKL,*B~9b|
    };
    
    let adminDetails2 = {
        name : "NCPD ADMIN",
       email: "admin@accessabilitybahamas.org",
       $setOnInsert:{ password: password},           //q%E7<HIKL,*B~9b|
    };
    let adminDetails3 = {
        name : "NCPD ADMIN",
        email: "admin@ncpd.com",
        $setOnInsert:{password: password},           //q%E7<HIKL,*B~9b|
    };
    CreateAdmin(adminDetails2);
    CreateAdmin(adminDetails1);
    CreateAdmin(adminDetails3);
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